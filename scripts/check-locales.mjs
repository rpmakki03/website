#!/usr/bin/env node
/**
 * Verifies every locale file matches the English source: same keys, same
 * nesting, same array lengths, no empty strings where English has text, and
 * the {year} placeholder intact. Run with: node scripts/check-locales.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["en", "hi", "mr", "te", "kn", "ml", "gu", "bn", "or", "ne"];
const SOURCE = "en";
// Split-heading fragments get redistributed for word order, so a translation
// may legitimately leave the lead or tail blank.
const OPTIONAL = /^title(Lead|Tail)$/;

const load = (code) => {
  const file = join(root, "locales", code, "landing.json");
  if (!existsSync(file)) throw new Error(`missing file: locales/${code}/landing.json`);
  return JSON.parse(readFileSync(file, "utf8"));
};

const source = load(SOURCE);
const problems = [];

function walk(src, target, path, code) {
  for (const key of Object.keys(src)) {
    const at = path ? `${path}.${key}` : key;
    if (!(key in target)) {
      problems.push(`${code}: missing key "${at}"`);
      continue;
    }
    const a = src[key];
    const b = target[key];

    if (Array.isArray(a)) {
      if (!Array.isArray(b)) {
        problems.push(`${code}: "${at}" should be an array`);
      } else if (a.length !== b.length) {
        problems.push(`${code}: "${at}" has ${b.length} items, expected ${a.length}`);
      } else {
        a.forEach((item, i) => {
          if (item && typeof item === "object") walk(item, b[i], `${at}[${i}]`, code);
          else if (typeof b[i] !== "string" || !b[i].trim())
            problems.push(`${code}: "${at}[${i}]" is empty`);
        });
      }
    } else if (a && typeof a === "object") {
      if (!b || typeof b !== "object") problems.push(`${code}: "${at}" should be an object`);
      else walk(a, b, at, code);
    } else if (typeof a === "string") {
      if (typeof b !== "string") {
        problems.push(`${code}: "${at}" should be a string`);
      } else if (a.trim() && !b.trim() && !OPTIONAL.test(key)) {
        problems.push(`${code}: "${at}" is empty but English has text`);
      }
      // placeholders must survive translation
      for (const ph of a.match(/\{\w+\}/g) ?? []) {
        if (typeof b === "string" && !b.includes(ph))
          problems.push(`${code}: "${at}" lost placeholder ${ph}`);
      }
    }
  }
}

// competition ids are code identifiers, never translated
function checkIds(target, code) {
  const ids = source.competitions.items.map((c) => c.id);
  const got = (target.competitions?.items ?? []).map((c) => c.id);
  ids.forEach((id, i) => {
    if (got[i] !== id) problems.push(`${code}: competitions.items[${i}].id is "${got[i]}", expected "${id}"`);
  });
}

for (const code of LOCALES) {
  if (code === SOURCE) continue;
  let target;
  try {
    target = load(code);
  } catch (err) {
    problems.push(`${code}: ${err.message}`);
    continue;
  }
  walk(source, target, "", code);
  checkIds(target, code);
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n` + problems.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log(`✓ all ${LOCALES.length} locales match the ${SOURCE} source`);

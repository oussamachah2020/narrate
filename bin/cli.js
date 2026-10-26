#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const NAME = 'narrate';
const PKG_ROOT = path.join(__dirname, '..');
const PAYLOAD = ['SKILL.md', 'references'];
const pkg = require(path.join(PKG_ROOT, 'package.json'));

const HELP = `${NAME} v${pkg.version}: install the "${NAME}" Claude Code skill

Usage:
  npx ${pkg.name} [command] [options]

Commands:
  install      Copy the skill into a Claude Code skills folder (default)
  uninstall    Remove the installed skill
  path         Print where the skill would be installed
  help         Show this message

Options:
  -p, --project   Use ./.claude/skills (this project only) instead of ~/.claude/skills
  -f, --force     Overwrite an existing install without asking
  -v, --version   Print the version
`;

function parseArgs(argv) {
  const opts = { command: 'install', project: false, force: false };
  for (const arg of argv) {
    switch (arg) {
      case 'install':
      case 'uninstall':
      case 'path':
      case 'help':
        opts.command = arg;
        break;
      case '-p':
      case '--project':
        opts.project = true;
        break;
      case '-f':
      case '--force':
        opts.force = true;
        break;
      case '-h':
      case '--help':
        opts.command = 'help';
        break;
      case '-v':
      case '--version':
        opts.command = 'version';
        break;
      default:
        fail(`Unknown argument: ${arg}\n\n${HELP}`);
    }
  }
  return opts;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function targetDir(opts) {
  const base = opts.project
    ? path.join(process.cwd(), '.claude', 'skills')
    : path.join(os.homedir(), '.claude', 'skills');
  return path.join(base, NAME);
}

function install(opts) {
  const dest = targetDir(opts);

  if (path.resolve(dest) === path.resolve(PKG_ROOT)) {
    fail(`The skill is already running from ${dest}; nothing to install.`);
  }

  if (fs.existsSync(dest) && !opts.force) {
    fail(`${dest} already exists. Re-run with --force to overwrite it.`);
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of PAYLOAD) {
    fs.cpSync(path.join(PKG_ROOT, entry), path.join(dest, entry), { recursive: true });
  }

  console.log(`Installed ${NAME} v${pkg.version} to ${dest}`);
  console.log('Restart Claude Code, then ask it to write or plan website content.');
}

function uninstall(opts) {
  const dest = targetDir(opts);
  if (!fs.existsSync(dest)) {
    fail(`Nothing to remove: ${dest} does not exist.`);
  }
  fs.rmSync(dest, { recursive: true, force: true });
  console.log(`Removed ${dest}`);
}

const opts = parseArgs(process.argv.slice(2));

switch (opts.command) {
  case 'install':
    install(opts);
    break;
  case 'uninstall':
    uninstall(opts);
    break;
  case 'path':
    console.log(targetDir(opts));
    break;
  case 'version':
    console.log(pkg.version);
    break;
  default:
    console.log(HELP);
}

# narrate

A [Claude Code](https://claude.com/claude-code) skill that turns a client's vision into accurate, high-converting website content.

Most AI-written copy fails in one of three ways: it is generic, it is derivative, or it invents claims. `narrate` is built to prevent all three.

## What it does

When you ask Claude Code to write or plan website content, the skill runs in phases:

1. **Interview.** Claude asks about your audience, your promise, what really sets you apart, the people behind the business, and the proof you have. It writes this up as a Vision Brief and waits for your confirmation before going further.
2. **Research.** It gathers real facts and studies best-in-class sites in your field for patterns, not text to copy.
3. **Write.** It produces structured copy (homepage, landing page, service pages, FAQ, CTAs) in French, English, or both.
4. **Check.** Every claim is traced to a source, every placeholder gets an empty-state plan, and a quality pass catches vague or unsupported statements.

## Install

### With npx (recommended)

Requires Node.js 16.7 or later.

```bash
npx narrate-skill
```

This copies the skill to `~/.claude/skills/narrate`, where Claude Code finds it in every project. Restart Claude Code afterwards.

| Option | Effect |
| --- | --- |
| `-p`, `--project` | Install to `./.claude/skills/narrate` for the current project only |
| `-f`, `--force` | Overwrite an existing install (needed to update) |

```bash
npx narrate-skill --project      # this project only
npx narrate-skill --force        # update to the latest version
npx narrate-skill uninstall      # remove it
npx narrate-skill path           # show where it would be installed
```

### With git

```bash
git clone https://github.com/<your-username>/narrate.git ~/.claude/skills/narrate
```

To update later, run `git pull` inside that folder.

### Manually

Copy `SKILL.md` and the `references/` folder into `~/.claude/skills/narrate/`.

## Usage

Just describe what you need. The skill triggers on requests like:

- "Write the copy for this site"
- "Rewrite my homepage"
- "Plan the content for a landing page"
- "Here's the URL, what should this page say?"

Claude will start by asking you questions. That is intentional: the interview is what keeps the copy specific to your business. Answer in a sentence or two, or pick from the options offered.

You can also invoke it explicitly with `/narrate`.

## What's inside

```
narrate/
├── SKILL.md                          # The skill: phases, rules, output format
├── references/
│   ├── discovery-questions.md        # Interview wording and defaults
│   ├── conversion-principles.md      # Landing-page principles and section flows
│   └── content-quality-checks.md     # Final quality checklist
├── bin/cli.js                        # The installer behind `npx narrate-skill`
└── package.json
```

## Customizing

The skill is plain Markdown. Edit `SKILL.md` to change the workflow, or the files in `references/` to change the interview questions, conversion principles, or quality checks. Changes apply the next time Claude Code starts.

## Contributing

Issues and pull requests are welcome. Keep changes to the reference files focused: each one is loaded into Claude's context, so shorter is better.

## License

MIT

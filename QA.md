# Validation — version 2.0

Validated 7 October 2026 before publication.

## Automated result

`npm test`: **19 tests passed, 0 failed.**

The generator test covers **365 dates in both modes (730 case/mode combinations)**. Each generated case is deterministic, has four distinct characters, legal adjacent-room movements, an alone-at-pickup weapon path, and one accepted culprit/weapon/time combination among all 48 submissions. The deduction checks independently narrow the death window, eliminate the two verified alibis, and eliminate inaccessible or excluded weapons.

The hard-mode death-window clue was strengthened to independent camera evidence. It no longer depends on assuming that a potential killer's statement is truthful.

## Edge cases checked

- First and last clue bounds; rereading costs no extra points.
- Missing answers, wrong types, nonexistent IDs and selecting the victim.
- Incorrect answer penalties and duplicate wrong submissions.
- Solving, opening further clues, and refreshing without changing the completion score.
- Score floor at zero and normalization of invalid saved scores.
- Independent easy/hard saved progress.
- Malformed JSON, invalid saved indices and mark values, unknown state fields, and oversized notes.
- Blocked localStorage and quota errors with in-memory fallback.
- Conflicting timeline marks warn without silently changing the user's deductions.
- Confirmation before clearing marks; written notes remain intact.
- Ordinary two-tab updates detected before overwriting saved progress.
- India midnight boundary, leap day and year rollover.
- New-day announcement without discarding the unfinished case.
- Invalid calendar dates, offsets and game modes.
- Previous-case selection, theme switching and keyboard tab navigation.
- Optional WebMCP registration, valid actions and invalid input in the controller fixture.

JavaScript syntax, HTML IDs and local asset references were also checked.

## Testing boundary

Controller tests use a simulated DOM. **Live visual/browser testing, real touch devices, screen-reader testing, and a supported live WebMCP runtime were not available in this static-site preview environment.** The automated results do not certify those areas or guarantee all possible edge cases. Responsive breakpoints, native dialogs, focus states, Kannada system-font fallbacks and reduced-motion rules are implemented in source.

## Short browser smoke test for your own deployment

1. Open the live URL in current Chrome or Edge. Check that the Kannada heading and background image load.
2. Resize to desktop and a 360-pixel-wide phone view. The timeline may scroll horizontally within its panel; the entire page should not scroll sideways.
3. Read a new clue and revisit it. Confirm that only the first read lowers the score.
4. Add timeline marks and notes, refresh, and check restoration.
5. Switch difficulty twice. Confirm each mode retains its own progress.
6. Submit incomplete answers, a wrong combination, the same wrong combination again, and then a correct combination.
7. After solving, open remaining clues and refresh. Confirm the final score remains unchanged.
8. Open Help; use Tab and Escape. Test suspect tabs with the arrow keys. Confirm focus is visible.
9. Try dark/light themes, browser zoom at 200%, and the system's reduced-motion setting.
10. Open the same case in another tab, change it, then return to the first tab. Confirm the conflict notice and latest-progress action.
11. Open an older case and return to today's case. Confirm notes remain isolated by date and difficulty.

For public competitive use, move answers and scoring to a trusted server first. For ordinary casual play, the static deployment is self-contained.

import { openSource } from "@/data";

export const ALL_MERGED_PRS_URL =
    "https://github.com/pulls?q=is%3Apr+author%3Aebrahim2355+is%3Amerged";

// "55.6k+" rather than "55.6k": the star counts in the data are a snapshot, so
// they only ever undercount as these repos keep growing.
export const formatStars = (count: number) =>
    count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k+` : `${count}`;

// Pinned locale and time zone so the server and client render the same string.
export const formatMerged = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });

// One entry per repo, so three Saleor PRs count as a single project.
const repoStars = new Map(openSource.map((c) => [c.repo, c.stars]));

// Always derived from every contribution, including the ones the home page
// preview leaves out — these are headline numbers for the whole body of work.
export const contributionSummary = [
    { label: "Merged PRs", value: `${openSource.length}` },
    { label: "Upstream Projects", value: `${repoStars.size}` },
    {
        label: "Combined Stars",
        value: formatStars([...repoStars.values()].reduce((sum, s) => sum + s, 0)),
    },
    {
        label: "Lines Shipped",
        value: `${openSource.reduce((sum, c) => sum + c.additions, 0)}`,
    },
];

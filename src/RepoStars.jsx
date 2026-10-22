import React from "react";
import github from "./media/github_b.png";
import useStars from "./useStars";

// "https://github.com/owner/name/pull/1" → "owner/name"
export const slugOf = (link) => new URL(link).pathname.split("/").filter(Boolean).slice(0, 2).join("/");

// 1234 → "1.2k"
const compact = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n));

// Live GitHub stars for one or more repositories (summed). `fallback` is shown until GitHub answers, or if it never does.
const RepoStars = ({ links, fallback = 0 }) => {
    const repos = [...new Set(links.map(slugOf))];
    const stars = useStars(repos);
    const loaded = repos.filter((repo) => repo in stars);
    const total = loaded.length === repos.length ? loaded.reduce((sum, repo) => sum + stars[repo], 0) : fallback;
    if (!total) return null;
    return (
        <span className="proj__stars" title={total + " stars on GitHub"}>
            <img src={github} alt=""></img>
            ★ {compact(total)}
        </span>
    );
};

export default RepoStars;

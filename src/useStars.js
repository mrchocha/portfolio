import { useEffect, useState } from "react";

const TTL = 6 * 60 * 60 * 1000;

// Cached per browser so the unauthenticated GitHub API limit (60 requests/hour) is not burned on every visit
const readCache = (repo) => {
    try {
        const hit = JSON.parse(localStorage.getItem("stars:" + repo));
        return hit && Date.now() - hit.at < TTL ? hit.count : null;
    } catch (e) {
        return null;
    }
};

const writeCache = (repo, count) => {
    try {
        localStorage.setItem("stars:" + repo, JSON.stringify({ count, at: Date.now() }));
    } catch (e) { /* storage unavailable */ }
};

// Star counts for "owner/name" repositories, as { "owner/name": count }. Stays empty until loaded, or if GitHub is unreachable.
export default function useStars(repos) {
    const [stars, setStars] = useState({});
    const key = repos.join(",");

    useEffect(() => {
        let live = true;
        repos.forEach((repo) => {
            const cached = readCache(repo);
            if (cached !== null) {
                setStars((prev) => ({ ...prev, [repo]: cached }));
                return;
            }
            fetch("https://api.github.com/repos/" + repo)
                .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
                .then((data) => {
                    writeCache(repo, data.stargazers_count);
                    if (live) setStars((prev) => ({ ...prev, [repo]: data.stargazers_count }));
                })
                .catch(() => { });
        });
        return () => { live = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return stars;
}

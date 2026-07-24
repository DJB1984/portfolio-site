import { site } from "@/data/site";
import { Tag } from "@/components/ui/tag";

/**
 * Skills rendered as grouped chip clusters (not icon cards). Each group leads
 * with a mono category label — a small "index" of what Davis works with.
 */
export function SkillList() {
  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
      {site.skills.map((group) => (
        <div key={group.category}>
          <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {group.category}
          </dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

import { Fragment } from "react";
import ActiveLink from "./ActiveLink";

const BreadcrumbItem = ({ item: { href, value }, index }) => {
  return (
    <li
      className={`${
        index == 0 ? "pr-4" : "px-4"
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <ActiveLink href={href}>
        <a>{value}</a>
      </ActiveLink>
    </li>
  );
};

export default function Breadcrumb({ items, isAdmin }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map(({ href, value, requireAdmin }, i) => (
          <Fragment key={href}>
            {!requireAdmin && (
              <BreadcrumbItem item={{ href, value }} index={i} />
            )}
            {requireAdmin && isAdmin && (
              <BreadcrumbItem item={{ href, value }} index={i} />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

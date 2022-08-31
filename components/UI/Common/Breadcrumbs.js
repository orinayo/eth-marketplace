import ActiveLink from "./ActiveLink";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map(({ href, value }, i) => (
          <li
            key={href}
            className={`${
              i == 0 ? "pr-4" : "px-4"
            } font-medium text-gray-500 hover:text-gray-900`}
          >
            <ActiveLink href={href}>
              <a>{value}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}

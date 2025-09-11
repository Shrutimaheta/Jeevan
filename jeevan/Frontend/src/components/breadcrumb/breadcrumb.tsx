import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  title?: string;
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, items }) => {
  return (
    <div className="breadcrumb-arrow mb-4">
      {title && <h4 className="mb-1">{title}</h4>}
      <div className="text-end">
        <nav aria-label="Breadcrumb navigation">
          <ol className="breadcrumb m-0 py-0">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li
                  key={item.label + idx}
                  className={`breadcrumb-item${isLast ? " active" : ""}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {isLast || !item.href ? (
                    <span>{item.label}</span>
                  ) : (
                    <a href={item.href} aria-label={`Navigate to ${item.label}`}>{item.label}</a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;

import { cn } from "../../utils/cn";

export default function Table({ columns, data, rowKey = "id", onRowClick, className }) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-bg-border", className)}>
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-bg-border bg-bg-card/60">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium text-text-muted whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-text-muted">
                No results found.
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={row[rowKey]}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "border-b border-bg-border/60 transition-colors last:border-0 hover:bg-bg-hover",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CompaniesView({ companyDistribution = [], onSelectCompany }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Company Specific Prep</h2>
        <p className="text-xs text-text-muted">
          Target interview questions tagged by top tech companies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companyDistribution.map((item) => (
          <div
            key={item.company}
            onClick={() => onSelectCompany(item.company)}
            className="group cursor-pointer rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm transition-all hover:border-blue-500/50 hover:bg-[#111A2E]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Building2 size={18} />
                </div>
                <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                  {item.company}
                </h3>
              </div>

              <span className="text-xs font-bold text-purple-400">
                {item.count} Solved
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end text-xs font-semibold text-purple-400">
              <span>View Company Questions</span>
              <ArrowRight size={13} className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

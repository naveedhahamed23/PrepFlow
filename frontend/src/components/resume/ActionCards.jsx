import {
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";



export function ActionCards({
  onUpload,
  isUploading,
  onCreateNew,
}) {
  return (
    <div className="flex flex-col gap-3 w-full">

      {/* ============================================================
          UPLOAD EXISTING RESUME
          ============================================================ */}
      <div
        className="
          w-full min-w-0 h-[125px]
          rounded-2xl
          border border-blue-500/20
          bg-gradient-to-br from-[#0d1a31] to-[#0a1222]
          p-4
          shadow-lg shadow-black/10
        "
      >
        <div className="flex items-start gap-3">

          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-blue-500/25
              bg-blue-500/10
            "
          >
            <Upload
              size={20}
              className="text-blue-400"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-text">
              Upload Existing Resume
            </h3>

            <p className="mt-1 text-sm text-text-muted">
              Get AI analysis and improvement suggestions
            </p>
          </div>

        </div>

        <div className="mt-3 flex items-center gap-3">

          <label
            className="
              inline-flex
              cursor-pointer
              items-center
              gap-2
              rounded-xl
              bg-primary
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-primary/90
              disabled:cursor-not-allowed
            "
          >
            <Upload size={17} />

            {isUploading ? "Uploading..." : "Upload PDF"}

            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={onUpload}
              disabled={isUploading}
            />
          </label>

          <span className="text-xs text-text-muted">
            PDF up to 10MB
          </span>

        </div>
      </div>


      {/* ============================================================
          CREATE NEW RESUME
          ============================================================ */}
      <div
        className="
          w-full min-w-0 h-[125px]
          rounded-2xl
          border border-emerald-500/20
          bg-gradient-to-br from-[#0d1a31] to-[#0a1222]
          p-4
          shadow-lg shadow-black/10
        "
      >
        <div className="flex items-start gap-3">

          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-emerald-500/25
              bg-emerald-500/10
            "
          >
            <FileText
              size={20}
              className="text-emerald-400"
            />
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="text-base font-semibold text-text">
              Create New Resume
            </h3>

            <p className="mt-1 text-sm text-text-muted">
              Build a professional resume from scratch
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="
            mt-3
            inline-flex
            items-center
            gap-2
            rounded-xl
            border border-border
            bg-surface/60
            px-4
            py-2
            text-sm
            font-semibold
            text-text
            transition
            hover:border-primary/50
            hover:bg-primary/10
          "
        >
          Start Building
          <ArrowRight size={17} />
        </button>

      </div>


      {/* ============================================================
          AI POWERED
          ============================================================ */}
      <div
        className="
          relative
          w-full min-w-0 h-[145px]
          overflow-hidden
          rounded-2xl
          border border-purple-500/25
          bg-gradient-to-br from-[#11102d] via-[#12112f] to-[#0b1021]
          p-4
          shadow-lg shadow-black/10
        "
      >

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div className="relative">

          <div className="flex items-start gap-3">

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                border border-purple-500/25
                bg-purple-500/10
              "
            >
              <Sparkles
                size={20}
                className="text-purple-400"
              />
            </div>

            <div className="min-w-0">

              <h3 className="text-base font-semibold text-text">
                AI Powered
              </h3>

              <div className="mt-1 space-y-1 leading-4">

                <div className="flex items-start gap-2 text-sm text-text-muted">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-purple-400"
                  />
                  <span>ATS score and detailed analysis</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-text-muted">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-purple-400"
                  />
                  <span>Smart suggestions and improvements</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-text-muted">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-purple-400"
                  />
                  <span>Professional templates</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-text-muted">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-purple-400"
                  />
                  <span>Tailored for your target roles</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
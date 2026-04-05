"use client";

import { useState } from "react";

import { formatPkr } from "@/lib/utils";
import type { PaymentInfo, ProductRoi, ProductRoiRow, StoreProduct, StoreVariant } from "@/types";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#86f556]">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">{description}</p>
    </div>
  );
}

function parseRoiValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatPlanningMetric(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits,
    minimumFractionDigits: value % 1 === 0 ? 0 : Math.min(1, maximumFractionDigits),
  }).format(value);
}

function getPlantCount(row: ProductRoiRow, variant?: StoreVariant) {
  if (typeof row.plantCount === "number") {
    return row.plantCount;
  }

  const sourceText = `${row.title} ${variant?.name ?? ""}`;
  const matchedValue = sourceText.match(/\d+/)?.[0];
  const parsed = matchedValue ? Number.parseInt(matchedValue, 10) : Number.NaN;

  return Number.isFinite(parsed) ? parsed : null;
}

function getRoiMetrics(
  row: ProductRoiRow,
  variant: StoreVariant | undefined,
  inputs: Record<string, string>,
) {
  if (!variant || typeof variant.pricePkr !== "number") {
    return null;
  }

  const plantCount = getPlantCount(row, variant);

  if (!plantCount) {
    return null;
  }

  const sellingPricePerPlant = parseRoiValue(inputs.sellingPricePerPlant);
  const cycleDays = parseRoiValue(inputs.cycleDays);
  const successRate = parseRoiValue(inputs.successRate);
  const monthlyOperatingCost = parseRoiValue(inputs.monthlyOperatingCost);

  if (
    sellingPricePerPlant === null ||
    cycleDays === null ||
    successRate === null ||
    monthlyOperatingCost === null ||
    cycleDays <= 0
  ) {
    return null;
  }

  const monthlyCycles = 30 / cycleDays;
  const saleablePlantsPerCycle = plantCount * (successRate / 100);
  const monthlySaleablePlants = saleablePlantsPerCycle * monthlyCycles;
  const monthlyRevenue = monthlySaleablePlants * sellingPricePerPlant;
  const monthlyProfit = monthlyRevenue - monthlyOperatingCost;
  const paybackMonths = monthlyProfit > 0 ? variant.pricePkr / monthlyProfit : null;

  return {
    plantCount,
    towerPrice: variant.pricePkr,
    monthlyCycles,
    monthlySaleablePlants,
    monthlyRevenue,
    monthlyProfit,
    paybackMonths,
  };
}

export function ProductDatasheetPanel({
  product,
  selectedVariant,
}: {
  product: StoreProduct;
  selectedVariant: StoreVariant;
}) {
  if (!product.datasheet) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#102412] p-6 text-white shadow-[0_22px_50px_rgba(8,18,12,0.22)] sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeading
          eyebrow="Specification Sheet"
          title="Review the structured product sheet"
          description={product.datasheet.summary}
        />
        {product.datasheet.asset ? (
          <a
            href={product.datasheet.asset.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/16 px-5 py-3 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556]"
          >
            {product.datasheet.asset.label}
          </a>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {product.datasheet.sections.map((section) => {
          const isSelectedVariant = section.title === selectedVariant.name;

          return (
            <article
              key={section.title}
              className={`rounded-[1.5rem] border p-5 transition ${
                isSelectedVariant
                  ? "border-[#86f556] bg-[#86f556]/10 shadow-[0_16px_36px_rgba(134,245,86,0.12)]"
                  : "border-white/10 bg-white/4"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white">{section.title}</h3>
                  {section.summary ? (
                    <p className="mt-2 text-sm leading-6 text-white/70">{section.summary}</p>
                  ) : null}
                </div>
                {isSelectedVariant ? (
                  <span className="rounded-full bg-[#86f556] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#132117]">
                    Active
                  </span>
                ) : null}
              </div>

              <div className="mt-5 space-y-3">
                {section.specifications.map((item) => (
                  <div
                    key={`${section.title}-${item.label}`}
                    className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                      {item.label}
                    </span>
                    <span className="max-w-[60%] text-right text-sm font-semibold text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {product.datasheet.notes?.length ? (
        <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/14 p-5 text-sm leading-7 text-white/72">
          {product.datasheet.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function PaymentInfoPanel({
  paymentInfo,
  title = "Payment Methods & Banking Details",
  description = "Payment details stay informational in this phase. Buyers can review the available paths before they move into WhatsApp confirmation.",
}: {
  paymentInfo: PaymentInfo;
  title?: string;
  description?: string;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#102412] p-6 text-white shadow-[0_22px_50px_rgba(8,18,12,0.22)] sm:p-8">
      <SectionHeading eyebrow="Payments" title={title} description={description} />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {paymentInfo.methods.map((method) => (
          <article
            key={method.id}
            className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5"
          >
            <p className="text-lg font-black text-white">{method.title}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{method.description}</p>
            {method.meta ? (
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#86f556]">
                {method.meta}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/14 p-5">
          <h3 className="text-lg font-black text-white">{paymentInfo.heading ?? "Company account"}</h3>
          <div className="mt-4 space-y-3">
            {(paymentInfo.bankDetails ?? []).map((detail) => (
              <div
                key={detail.label}
                className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-white/4 px-4 py-3"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                  {detail.label}
                </span>
                <span className="max-w-[62%] text-right text-sm font-semibold text-white">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
          <h3 className="text-lg font-black text-white">Notes before confirmation</h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
            {(paymentInfo.notes ?? []).map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductRoiPanel({
  product,
  roi,
  selectedVariant,
}: {
  product: StoreProduct;
  roi: ProductRoi;
  selectedVariant: StoreVariant;
}) {
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    () =>
      roi.inputs?.reduce<Record<string, string>>((state, input) => {
        state[input.id] = "";
        return state;
      }, {}) ?? {},
  );

  const hasCalculator = (roi.inputs?.length ?? 0) > 0;
  const canCalculate =
    roi.inputs?.every((input) => {
      const value = inputValues[input.id];
      return typeof value === "string" && value.trim().length > 0 && parseRoiValue(value) !== null;
    }) ?? false;
  const selectedRow = roi.rows.find((row) => row.variantId === selectedVariant.id) ?? roi.rows[0];
  const selectedMetrics = getRoiMetrics(selectedRow, selectedVariant, inputValues);

  function setInputValue(id: string, value: string) {
    setInputValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function fillSampleAssumptions() {
    if (!roi.inputs) {
      return;
    }

    setInputValues(
      roi.inputs.reduce<Record<string, string>>((state, input) => {
        state[input.id] = typeof input.exampleValue === "number" ? String(input.exampleValue) : "";
        return state;
      }, {}),
    );
  }

  function clearAssumptions() {
    if (!roi.inputs) {
      return;
    }

    setInputValues(
      roi.inputs.reduce<Record<string, string>>((state, input) => {
        state[input.id] = "";
        return state;
      }, {}),
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#102412] p-6 text-white shadow-[0_22px_50px_rgba(8,18,12,0.22)] sm:p-8">
      <SectionHeading
        eyebrow="Hydroponics ROI"
        title={roi.title ?? "ROI planning"}
        description={roi.summary}
      />

      {hasCalculator ? (
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/14 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Enter your crop assumptions</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Add your local crop numbers to estimate monthly output, revenue, profit, and payback for each tower.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={fillSampleAssumptions}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#86f556] hover:text-[#86f556]"
                >
                  {roi.sampleLabel ?? "Use sample assumptions"}
                </button>
                <button
                  type="button"
                  onClick={clearAssumptions}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-white/22 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {roi.inputs?.map((input) => (
                <label key={input.id} className="block">
                  <span className="text-sm font-bold text-white">{input.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-white/60">{input.helper}</span>
                  <div className="mt-3 rounded-[1.1rem] border border-white/10 bg-white/4 px-4 py-3">
                    {input.prefix ? (
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#86f556]">
                        {input.prefix}
                      </p>
                    ) : null}
                    <input
                      type="number"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={inputValues[input.id] ?? ""}
                      onChange={(event) => setInputValue(input.id, event.target.value)}
                      placeholder={input.placeholder}
                      className="mt-2 w-full bg-transparent text-lg font-black text-white outline-none placeholder:text-white/28"
                    />
                    {input.suffix ? (
                      <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/46">
                        {input.suffix}
                      </p>
                    ) : null}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
            <h3 className="text-xl font-black text-white">
              {canCalculate ? `${selectedVariant.name} planning snapshot` : "How the calculator works"}
            </h3>
            {canCalculate && selectedMetrics ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    Monthly saleable plants
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {formatPlanningMetric(selectedMetrics.monthlySaleablePlants)}
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    Monthly revenue
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {formatPkr(Math.round(selectedMetrics.monthlyRevenue))}
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    Monthly operating profit
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {formatPkr(Math.round(selectedMetrics.monthlyProfit))}
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    Estimated payback
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {selectedMetrics.paybackMonths !== null
                      ? `${formatPlanningMetric(selectedMetrics.paybackMonths)} months`
                      : "Needs stronger margin"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-sm leading-7 text-white/72">
                <p>
                  Monthly revenue is estimated from plant capacity, saleable harvest rate, crop cycle length, and selling price per plant.
                </p>
                <p>
                  Monthly operating profit is estimated by subtracting one tower&apos;s monthly running cost from the estimated monthly revenue.
                </p>
                <p>
                  Payback shows how many months it may take to recover the tower cost if the same performance is maintained.
                </p>
              </div>
            )}

            {roi.sampleNote ? (
              <div className="mt-5 rounded-[1rem] border border-[#86f556]/30 bg-[#86f556]/10 px-4 py-3 text-sm leading-6 text-white/78">
                {roi.sampleNote}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {roi.rows.map((row) => {
          const isActive = row.variantId === selectedVariant.id;
          const variant = product.variants.find((item) => item.id === row.variantId);
          const metrics = getRoiMetrics(row, variant, inputValues);
          const plantCount = getPlantCount(row, variant);

          return (
            <article
              key={`${row.title}-${row.value}`}
              className={`rounded-[1.5rem] border p-5 ${
                isActive
                  ? "border-[#86f556] bg-[#86f556]/10 shadow-[0_16px_36px_rgba(134,245,86,0.12)]"
                  : "border-white/10 bg-white/4"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#86f556]">{row.title}</p>
                  <h3 className="mt-3 text-xl font-black text-white">{row.value}</h3>
                </div>
                {isActive ? (
                  <span className="rounded-full bg-[#86f556] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#132117]">
                    Selected
                  </span>
                ) : null}
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                    Plant capacity
                  </span>
                  <span className="text-right text-sm font-semibold text-white">
                    {plantCount ? `${plantCount} plants` : row.title}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                    Tower price
                  </span>
                  <span className="text-right text-sm font-semibold text-white">
                    {variant?.pricePkr ? formatPkr(variant.pricePkr) : "Quote required"}
                  </span>
                </div>

                {canCalculate && metrics ? (
                  <>
                    <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                        Saleable plants / month
                      </span>
                      <span className="text-right text-sm font-semibold text-white">
                        {formatPlanningMetric(metrics.monthlySaleablePlants)}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                        Revenue / month
                      </span>
                      <span className="text-right text-sm font-semibold text-white">
                        {formatPkr(Math.round(metrics.monthlyRevenue))}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                        Profit / month
                      </span>
                      <span className="text-right text-sm font-semibold text-white">
                        {formatPkr(Math.round(metrics.monthlyProfit))}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/14 px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                        Estimated payback
                      </span>
                      <span className="text-right text-sm font-semibold text-white">
                        {metrics.paybackMonths !== null
                          ? `${formatPlanningMetric(metrics.paybackMonths)} months`
                          : "Needs stronger margin"}
                      </span>
                    </div>
                  </>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-white/70">{row.note}</p>
            </article>
          );
        })}
      </div>

      {roi.notes?.length ? (
        <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/14 p-5 text-sm leading-7 text-white/72">
          {roi.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

type TierOption = "basic" | "standard" | "premium"

const tiers: { id: TierOption; label: string; description: string }[] = [
  { id: "basic", label: "Basic", description: "For small projects and testing" },
  { id: "standard", label: "Standard", description: "For production applications" },
  { id: "premium", label: "Premium", description: "For high-performance needs" },
]

export function TierSelector({
  value,
  onChange,
}: {
  value: TierOption
  onChange: (value: TierOption) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {tiers.map((tier) => (
        <label
          key={tier.id}
          className={`cursor-pointer border rounded-lg p-4 transition-all ${
            value === tier.id ? "border-primary bg-primary/5" : "border-muted hover:border-primary/40"
          }`}
        >
          <input
            type="radio"
            name="tier"
            value={tier.id}
            checked={value === tier.id}
            onChange={() => onChange(tier.id)}
            className="sr-only"
          />
          <div className="flex flex-col space-y-1">
            <span className="font-medium">{tier.label}</span>
            <span className="text-sm text-muted-foreground">{tier.description}</span>
          </div>
        </label>
      ))}
    </div>
  )
}

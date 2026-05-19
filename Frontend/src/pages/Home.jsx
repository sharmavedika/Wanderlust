{/* Filters */}
<div
    id="filters"
    className="mt-3 d-flex align-items-center justify-content-between flex-wrap"
>

    {/* Filters row */}
    <div className="filters-row d-flex align-items-center gap-4 overflow-auto">

        {categories.map((cat) => (
            <Link
                to={`/?category=${cat.value}`}
                key={cat.value}
                className={`filter text-center text-decoration-none ${
                    activeCategory === cat.value ? "active-filter" : ""
                }`}
            >
                <div>
                    <i className={cat.icon}></i>
                </div>
                <p className="mb-0">{cat.name}</p>
            </Link>
        ))}

    </div>

    {/* Tax toggle */}
    <div className={`tax-toggle ms-3 ${showTax ? "active" : ""}`}>
        <div className="form-check form-switch mb-0 d-flex align-items-center">
            <input
                className="form-check-input me-2"
                type="checkbox"
                role="switch"
                id="taxSwitch"
                checked={showTax}
                onChange={() => setShowTax(!showTax)}
            />
            <label
                className="form-check-label mb-0 fw-medium"
                htmlFor="taxSwitch"
            >
                Display total after taxes
            </label>
        </div>
    </div>
</div>
import { createElement } from "../../shared/utils/create-element";

type SortOrder = "asc" | "desc";

type SortableTableData = Record<string, string | number>;

interface SortableTableHeader {
	id: string;
	title: string;
	sortable?: boolean;
	sortType?: "string" | "number";
	template?: (value: string | number) => string;
}

export default class SortableTable {
	element: HTMLElement;
	private bodyContainer: string = '[data-element="body"]';
	constructor(
		private headersConfig: SortableTableHeader[] = [],
		private data: SortableTableData[] = [],
	) {
		this.element = createElement(this.render());
	}

	private render(): string {
		const template = `
      <div class="sortable-table">
        <div class="sortable-table__header sortable-table__row" data-element="header">
          ${this.tableHeaderRender()}
        </div>
        <div class="sortable-table__body" data-element="body">
          ${this.rowBodyRender(this.data)}
        </div>
      </div>
    `;
		return template;
	}

	private tableHeaderRender() {
		return this.headersConfig
			.map(({ title, sortType, sortable, id }) => {
				const hasSortType = sortType ? `data-sort-type="${sortType}"` : "";
				const isSortable = sortable !== false ? "data-sortable" : "";
				return `
          <div class="sortable-table__cell" ${hasSortType} data-id="${id}" ${isSortable}>
            <span>${title}</span>
          </div>
        `;
			})
			.join("");
	}

	private rowBodyRender(data: SortableTableData[]) {
		return data
			.map((product) => {
				const cells = this.headersConfig
					.map((header) => {
						if (header.template) {
							return header.template(product[header.id]);
						}
						return `<div class="sortable-table__cell">${product[header.id]}</div>`;
					})
					.join("");

				return `<div class="sortable-table__row">${cells}</div>`;
			})
			.join("");
	}

	sort(field: SortableTableHeader["id"], order: SortOrder) {
		const header = this.headersConfig.find((header) => header.id === field);
		if (!header?.sortable) throw new Error("The cell cannot be sorted");

		let sortedData: SortableTableData[];

		const isAscOrder = order === "asc" ? 1 : -1;

		if (header?.sortType === "number") {
			sortedData = this.data.sort(
				(a, b) => ((a[field] as number) - (b[field] as number)) * isAscOrder,
			);
		} else {
			const intl = new Intl.Collator(["ru", "en"], {
				caseFirst: "upper",
			});
			sortedData = this.data.sort(
				(a, b) =>
					intl.compare(a[field] as string, b[field] as string) * isAscOrder,
			);
		}
		this.data = sortedData;
		const bodyElements = this.rowBodyRender(sortedData);

		const tableBodyContainer = this.element.querySelector(this.bodyContainer);
		if (!tableBodyContainer) {
			throw new Error("The table container is missing");
		}
		tableBodyContainer.innerHTML = "";
		tableBodyContainer.insertAdjacentHTML("beforeend", bodyElements);
	}
	remove() {
		this.element.remove();
	}
	destroy() {
		this.element.remove();
	}
}

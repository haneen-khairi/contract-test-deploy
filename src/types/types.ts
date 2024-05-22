export interface NavigationItem {
    text: string;
    href: string;
}

export interface Feature {
    icon: string;
    featureName: string;
    featureDescription: string;
}

export interface FeaturesData {
    title: string;
    description: string;
    featureList: Feature[];
}

export interface Insight {
    icon: string;
    title: string;
    description: string;
}

export interface BlogIntroData {
    title: string;
    sideText: string;
    description: string;
    blogInsightsList: Insight[];
}

export interface Testimonial {
    title: string;
    subTitle?: string;
    description: string;
}

export interface TestimonialsData {
    title: string;
    description: string;
    testimonialsList: Testimonial[];
}

export interface UserPermission {
    id: number;
    name: string;
};

export interface Instance {
    id: string;
    name: string;
    Permissions: UserPermission[];
};

export interface ContractPermissionsResponse {
    name: string;
    users: Instance[];
    error?: string;
};

export interface UserPermissionsResponse {
    name: string;
    contracts: Instance[];
    error?: string;
};

export interface FilterOption {
    id: number;
    name: string;
    icon: string;
    params: string;
    next_level: string;
    default: boolean;
}

export interface RepoFilterResponse {
    data: FilterOption[],
    error?: string
}

export interface RepositoryFolderItem {
    name: number;
    count: number;
    last_update: string;
    params: string;
    next_level: string;
}

export interface RepositoryFoldersResponse {
    data: RepositoryFolderItem[],
    error?: string
}

export interface FilesItem {
    id: string;
    name: string;
    last_update: string;
    cover_image: string;
}

export interface RepositoryFilesResponse {
    data: FilesItem[],
    error?: string
}

export interface InsightSummary {
    value: number;
    active_contract: number;
    about_to_end: number;
    upcoming: number;
    draft: number;
}

export interface StateItem {
    id: string,
    name: string,
    color: string
}

export interface ContractType {
    id: string,
    name: string,
}

export interface ContractSummaryResponse {
    data: InsightSummary,
    error?: string
}

export interface InvoiceItem {
    description: string;
    id: string;
    name: string;
    price: string | any;
    quantity: number;
}

export interface NewInvoiceItem {
    description: string;
    id?: string;
    name: string;
    price: string;
    quantity: number;
}


export interface InvoiceSummary {
    id: string;
    name: string;
    number: number;
    date: string;
    due_date: string;
    subtotal: number;
    tax_amount: number;
    total: number;
    amount: number;
    billed_from: string;
    billed_to: string;
    tax: string;
    discount: string;
    items: InvoiceItem[];
}

export interface InvoiceSummaryResponse {
    error?: string;
    data: InvoiceSummary | null;
}

export interface UpdateInvoiceObj {
    id: string;
    name: string;
    number: number;
    date: string;
    billed_from: string;
    billed_to: string;
    discount: string;
    tax: string;
}

export interface CalendarContractDetails {
    id: string;
    name: string;
    date: string;
    type: "start_contract" | "end_contract";
}

export interface CalendarDetailsResponse {
    data: CalendarContractDetails[],
    error?: string
}

export interface VerifyInvitationResponse {
    ok: boolean,
    message: string,
}
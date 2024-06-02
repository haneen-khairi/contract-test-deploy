import * as z from "zod";

const phoneRegExp = /^\+\d+\d+$/;
const passwordRegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{6,}$/;
const urlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const verifyEmailSchema = z.object({
    email: z.string(),
    otp: z.string().min(4),
});

export const forgetPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const newPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(
                passwordRegExp,
                "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

    export const signupSchema = z
    .object({
        first_name: z
            .string()
            .min(1, "First Name is required")
            .max(50, "First Name must be at most 50 characters"),
        last_name: z.string().min(1, "Last name is required."),
        phone_number: z
            .string()
            .min(1, "Phone number is required.")
            .regex(
                phoneRegExp,
                "Invalid phone number format. Should be +country_key phone_number"
            ),
        email: z
            .string()
            .email("Invalid email address.")
            .min(1, "Email is required."),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(
                passwordRegExp,
                "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
            ),
        confirmPassword: z.string().min(6, "Please confirm your password."),
        country: z.string().min(1, "Country is required."),
        company_name: z.string().min(1, "Company name is required."),
        employees_number: z.string().min(1, "Number of employees is required."),
        company_website: z.string().regex(urlRegex, "Invalid URL format."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

    export const inviteSignupSchema = z
    .object({
        first_name: z
            .string()
            .min(1, "First Name is required")
            .max(50, "First Name must be at most 50 characters"),
        last_name: z.string().min(1, "Last name is required."),
        phone_number: z
            .string()
            .min(1, "Phone number is required.")
            .regex(
                phoneRegExp,
                "Invalid phone number format. Should be +country_key phone_number"
            ),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(
                passwordRegExp,
                "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
            ),
        confirmPassword: z.string().min(6, "Please confirm your password."),
        job: z.string().min(1, "Job Title is required."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export const newTagSchema = z.object({
    tag_name: z.string().min(1, "Tag Name is required"),
    tag_value: z.string().min(1, "Tag Value is required."),
});

export const updateTagSchema = z.object({
    tag_name: z.string().min(1, "Tag Name is required"),
    tag_value: z.string().min(1, "Tag Value is required."),
});

export const newApprovalSchema = z.object({
    email: z.string().min(1, "Tag Name is required"),
});

export const editSummarySchema = z.object({
    summary: z.string().min(1, "Empty summary is not valid"),
});

export const editStatusSchema = z.object({
    status: z.string().min(1, "Status is required"),
});

export const submitApprovals = z.object({
    emails: z.array(z.string()),
});

export const newRelationSchema = z.object({
    type: z.string().min(1, "Type is required"),
    related_to: z.string().min(1, "Related to is required"),
});

export const editAccountSchema = z.object({
    first_name: z
        .string()
        .min(1, "First Name is required")
        .max(50, "First Name must be at most 50 characters"),
    last_name: z
        .string()
        .min(1, "Last name is required.")
        .max(50, "First Name must be at most 50 characters"),
        name: z.string().min(1, "Company name is required."),
    phone_number: z
        .string()
        .min(1, "Phone number is required.")
        .regex(
            phoneRegExp,
            "Invalid phone number format. Should be +country_key phone_number"
        ),
    image: z.any(),
    logo: z.any(),
});

export const changePasswordSchema = z.object({
    new_password: z.string().min(1, {
        message: "Password is required",
    }),
});

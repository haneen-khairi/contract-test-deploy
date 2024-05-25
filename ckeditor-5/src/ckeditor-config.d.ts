// src/ckeditor.d.ts
import * as CKEditor from '@ckeditor/ckeditor5-core';

declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        image?: {
            toolbar?: string[];
        };
    }
}

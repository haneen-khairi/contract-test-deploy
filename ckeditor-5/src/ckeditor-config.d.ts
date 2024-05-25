// src/ckeditor-config.d.ts
import '@ckeditor/ckeditor5-core/src/editor/editorconfig';

declare module '@ckeditor/ckeditor5-core/src/editor/editorconfig' {
    interface EditorConfig {
        image?: {
            toolbar: string[];
        };
        table?: {
            contentToolbar: string[];
        };
    }
}

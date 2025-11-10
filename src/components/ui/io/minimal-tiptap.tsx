"use client";

import { useState, useEffect, useCallback, forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Code,
  Quote,
  Redo,
  Undo,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  CodeSquare,
  Minus,
} from "lucide-react";
import { Toggle } from "@/src/components/ui/toggle";
import { cn } from "@/src/lib/utils";

interface MinimalTiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

const MinimalTiptap = forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ content = "", onChange, placeholder, editable = true, className }, ref) => {
    // 🔒 Previene SSR
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    // 🧠 Inicializa el editor solo en cliente
    const editor = useEditor({
      extensions: [StarterKit, Underline],
      content,
      editable,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose-base focus:outline-none max-w-none",
        },
      },
      // 👇 Evita render inmediato en SSR
      immediatelyRender: false,
    });

    const setLink = useCallback(() => {
      if (!editor) return;
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);
      if (url === null) return;
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    // 🚫 No renderizar hasta que esté montado y editor listo
    if (!mounted || !editor) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring",
          className
        )}
      >
        {editable && (
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border">
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("underline")}
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("code")}
              onPressedChange={() => editor.chain().focus().toggleCode().run()}
            >
              <Code className="w-4 h-4" />
            </Toggle>

            <div className="w-px h-4 mx-1 bg-border" />

            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 1 })}
              onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 2 })}
              onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 3 })}
              onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("paragraph")}
              onPressedChange={() => editor.chain().focus().setParagraph().run()}
            >
              <Pilcrow className="w-4 h-4" />
            </Toggle>

            <div className="w-px h-4 mx-1 bg-border" />

            <Toggle
              size="sm"
              pressed={editor.isActive("bulletList")}
              onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedList")}
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("blockquote")}
              onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("codeBlock")}
              onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <CodeSquare className="w-4 h-4" />
            </Toggle>

            <div className="w-px h-4 mx-1 bg-border" />

            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="inline-flex items-center justify-center w-8 h-8 p-0 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="w-px h-4 mx-1 bg-border" />

            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="inline-flex items-center justify-center w-8 h-8 p-0 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="inline-flex items-center justify-center w-8 h-8 p-0 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        )}

        <EditorContent
          editor={editor}
          className={cn(
            "flex-1 p-4 min-h-[200px]",
            !editable && "cursor-default"
          )}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

MinimalTiptap.displayName = "MinimalTiptap";
export { MinimalTiptap };

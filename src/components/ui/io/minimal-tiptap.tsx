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
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { Toggle } from "@/src/components/ui/toggle";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
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
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

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
      immediatelyRender: false,
    });

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
            {/* Grupo básico de formato */}
            <div className="flex items-center gap-1">
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
            </div>

            <div className="w-px h-4 mx-1 bg-border" />

            {/* Menú de encabezados */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Heading1 className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}
                >
                  <Heading1 className="w-4 h-4 mr-2" />
                  Título 1
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
                >
                  <Heading2 className="w-4 h-4 mr-2" />
                  Título 2
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}
                >
                  <Heading3 className="w-4 h-4 mr-2" />
                  Título 3
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={editor.isActive("paragraph") ? "bg-accent" : ""}
                >
                  <Pilcrow className="w-4 h-4 mr-2" />
                  Párrafo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-4 mx-1 bg-border" />

            {/* Grupo de listas y citas */}
            <div className="flex items-center gap-1">
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
            </div>

            <div className="w-px h-4 mx-1 bg-border" />

            {/* Menú de herramientas adicionales */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "bg-accent" : ""}
                >
                  <Strikethrough className="w-4 h-4 mr-2" />
                  Tachado
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={editor.isActive("code") ? "bg-accent" : ""}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Código en línea
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={editor.isActive("codeBlock") ? "bg-accent" : ""}
                >
                  <CodeSquare className="w-4 h-4 mr-2" />
                  Bloque de código
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Línea horizontal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-4 mx-1 bg-border" />

            {/* Botones de deshacer/rehacer */}
            <div className="flex items-center gap-1">
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
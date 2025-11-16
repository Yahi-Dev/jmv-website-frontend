"use client";

import { useState, useEffect, useCallback, forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
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
  maxLength?: number;
  showCharacterCount?: boolean;
}

const MinimalTiptap = forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ 
    content = "", 
    onChange, 
    placeholder, 
    editable = true, 
    className,
    maxLength = 250,
    showCharacterCount = true
  }, ref) => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);

    const editor = useEditor({
      extensions: [
        StarterKit, 
        Underline,
        CharacterCount.configure({
          limit: maxLength,
        })
      ],
      content,
      editable,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange?.(html);
      },
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose-base focus:outline-none max-w-none break-words overflow-wrap-anywhere",
        },
      },
      immediatelyRender: false,
    });

    // Función para manejar el input y prevenir exceder el límite
    const handleBeforeInput = useCallback((event: InputEvent) => {
      if (!editor) return;
      
      const { state } = editor;
      const { selection } = state;
      const text = event.data;
      
      // Calcular los caracteres que se agregarían
      const currentText = state.doc.textBetween(selection.from, selection.to);
      const currentLength = editor.storage.characterCount.characters();
      const newTextLength = text ? text.length : 0;
      
      // Si al agregar el texto se excede el límite, prevenir la acción
      if (currentLength - currentText.length + newTextLength > maxLength) {
        event.preventDefault();
        return;
      }
    }, [editor, maxLength]);

    // Agregar event listener para beforeinput
    useEffect(() => {
      if (!editor) return;

      const view = editor.view;
      view.dom.addEventListener('beforeinput', handleBeforeInput);

      return () => {
        view.dom.removeEventListener('beforeinput', handleBeforeInput);
      };
    }, [editor, handleBeforeInput]);

    if (!mounted || !editor) return null;

    const characters = editor.storage.characterCount.characters();
    const isNearLimit = characters > maxLength * 0.8; // 80% del límite
    const isOverLimit = characters > maxLength;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring overflow-hidden",
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

            {/* Contador de caracteres en la barra de herramientas */}
            {showCharacterCount && (
              <div className="ml-auto">
                <div className={cn(
                  "text-xs px-2 py-1 rounded",
                  isOverLimit 
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                    : isNearLimit 
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-muted text-muted-foreground"
                )}>
                  {characters}/{maxLength}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <EditorContent
            editor={editor}
            className={cn(
              "flex-1 p-4 min-h-[200px] prose prose-sm sm:prose-base max-w-none",
              "break-words overflow-wrap-anywhere whitespace-pre-wrap",
              "overflow-x-hidden", // Prevenir scroll horizontal
              !editable && "cursor-default",
              isOverLimit && "border-red-200 dark:border-red-800"
            )}
            placeholder={placeholder}
          />
          
          {/* Contador de caracteres en la parte inferior */}
          {showCharacterCount && (
            <div className="absolute bottom-2 right-2">
              <div className={cn(
                "text-xs px-2 py-1 rounded bg-background/80 backdrop-blur-sm",
                isOverLimit 
                  ? "text-red-600 dark:text-red-400" 
                  : isNearLimit 
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-muted-foreground"
              )}>
                {characters}/{maxLength}
              </div>
            </div>
          )}
        </div>

        {/* Estilos CSS para forzar el ajuste de texto */}
        <style jsx>{`
          .ProseMirror {
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
            overflow-x: hidden;
          }
          .ProseMirror p {
            word-break: break-word;
            overflow-wrap: anywhere;
          }
        `}</style>
      </div>
    );
  }
);

MinimalTiptap.displayName = "MinimalTiptap";
export { MinimalTiptap };
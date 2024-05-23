import { VariantProps } from "class-variance-authority";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { DialogTrigger, Group, Button } from "react-aria-components";
import {
  inputVariants,
  containerVariants,
  ComboboxListBox,
  ComboboxInput,
  ComboboxPopover,
} from "./components";

type ComboboxVariants = VariantProps<typeof inputVariants> &
  VariantProps<typeof containerVariants>;

/*
TODO:
1. Filter
2. Clear all
3. Persist selection
4. Display selected item
*/
export function ReusableCombobox({
  children,
  placeholder,
  intent,
  size,
  ...props
}: ComboboxVariants &
  Pick<React.ComponentProps<typeof ComboboxListBox>, "children"> &
  Pick<React.ComponentProps<typeof ComboboxInput>, "placeholder">) {
  const variants: ComboboxVariants = {
    intent,
    size,
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const popoverStyle = usePopoverStyle(containerRef);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div ref={containerRef}>
      <DialogTrigger>
        <Group className="flex rounded-lg bg-white bg-opacity-90 focus-within:bg-opacity-100 transition shadow-md ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-black">
          <input
            placeholder="select something!"
            ref={inputRef}
            onFocus={() => {
              setIsOpen(true);
            }}
            onBlur={(e) => {
              if (!listRef.current?.contains(e.relatedTarget)) setIsOpen(false);
            }}
            onKeyDownCapture={(e) => {
              if (["ArrowUp", "ArrowDown"].includes(e.key))
                listRef.current?.focus();
            }}
            className="flex-1 w-full border-none py-2 px-3 leading-5 text-gray-900 bg-transparent outline-none text-base"
          />

          <Button
            ref={buttonRef}
            className="px-3 flex items-center border-none outline-none pointer-events-none"
          >
            <ChevronsUpDown aria-hidden="true" className="h-4 w-4 opacity-50" />
          </Button>
        </Group>
        <ComboboxPopover
          style={popoverStyle}
          triggerRef={containerRef}
          isNonModal={true}
          isOpen={isOpen}
          offset={0}
        >
          <ComboboxListBox
            ref={listRef}
            className={containerVariants(variants)}
            selectionMode="multiple"
            onFocusChange={(isFocused) => {
              if (isFocused) return;
              setIsOpen(false);
              buttonRef.current?.focus();
            }}
          >
            {children}
          </ComboboxListBox>
        </ComboboxPopover>
      </DialogTrigger>
    </div>
  );
}

export {
  ComboboxSection,
  ComboboxPopover,
  ComboboxLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxCollection,
} from "./components";

function usePopoverStyle(containerRef: React.RefObject<HTMLDivElement>) {
  const [popoverStyle, setPopoverStyle] = React.useState({});
  React.useEffect(function updatePopoverStyle() {
    function onResize() {
      setPopoverStyle({
        width: containerRef.current?.clientWidth,
      });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return popoverStyle;
}

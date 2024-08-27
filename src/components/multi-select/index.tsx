import { VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsUpDown, X } from "lucide-react";
import React from "react";
import { Input, Group, Button } from "react-aria-components";
import {
  inputVariants,
  containerVariants,
  ComboboxListBox,
  ComboboxInput,
  ComboboxPopover,
} from "./components";
import { cn } from "@/lib/utils";
import { MultiselectListbox } from "./multiselect-listbox";

type ComboboxVariants = VariantProps<typeof inputVariants> &
  VariantProps<typeof containerVariants>;

  type Item = {
    id: string;
    label: string;
  };
  
  export type MultiselectProps = {
    items: Item[];
    selectedIds: string[];
    onItemChange: (ids: string[]) => void;
    onChange?: () => void;
    suffix?: string;
  } & Omit<React.ComponentProps<typeof Input>, "onChange"> & ComboboxVariants;
  

export function ReusableCombobox({
  placeholder,
  items: originalItems,
  intent = "primary",
  // border = "rounded",
  size,
  selectedIds,
  onItemChange,
  onChange,
  suffix,
  ...props
}: MultiselectProps &
  Pick<React.ComponentProps<typeof ComboboxListBox>, "children"> &
  Pick<React.ComponentProps<typeof ComboboxInput>, "placeholder">) {
  const variants: ComboboxVariants = {
    intent,
    size,
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLSpanElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef(null);
  const popoverStyle = usePopoverStyle(containerRef);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [items, setItems] = React.useState(originalItems);
  const [filtering, setFiltering] = React.useState(false);
  const changed = React.useRef(false);
  const showClearButton = React.useMemo(
    () => !isOpen && selectedIds.length > 0,
    [isOpen, selectedIds.length]
  );

  const openPopover = React.useCallback(() => {
    setInputValue("");
    setIsOpen(true);
  }, []);

  const closePopover = React.useCallback(() => {
    // if (selectedKeys === "all") {
    //   setInputValue(originalItems[0].label);
    // } else if (selectedKeys.size > 0) {
    //   let firstItemIndex = -1;
    //   for (const newKey of selectedKeys) {
    //     const index = originalItems.findIndex((f) => f.id === newKey);
    //     if (firstItemIndex === -1 || index < firstItemIndex) {
    //       firstItemIndex = index;
    //     }
    //   }

    //   setInputValue(originalItems[firstItemIndex].label);
    // } else {
    //   setInputValue("");
    // }
    setIsOpen(false);
  }, []);

  const handleChanged = React.useCallback(() => {
    if (changed.current) {
      onChange?.();
      changed.current = false;
    }
  }, [onChange]);

  React.useEffect(() => {
    function handlePopoverClose(event: Event) {
      if (isOpen && event.target === document) {
        closePopover();
      }
    }

    document.addEventListener("scroll", handlePopoverClose, true);

    return () => {
      document.removeEventListener("scroll", handlePopoverClose);
    };
  }, [closePopover, isOpen]);

  return (
    <div ref={parentRef} className="w-full h-[48px]">
      <Group ref={containerRef} className={"flex h-full items-center"}>
        <Input
          ref={inputRef}
          // intent={intent}
          // border={border}
          placeholder={placeholder}
          value={inputValue}
          onFocus={(event) => {
            if (!listRef.current?.contains(event.relatedTarget)) {
              if (!isOpen) {
                openPopover();
              }

              setFiltering(false);
              setItems(originalItems);
            }
          }}
          onChange={(e) => {
            const value = e.target.value;

            setInputValue(value);
            if (value.length === 0) {
              setFiltering(false);
              setItems(originalItems);
            } else {
              setFiltering(true);
              setItems(
                originalItems.filter((f) =>
                  f.label.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }
          }}
          onBlur={(e) => {
            if (!listRef.current?.contains(e.relatedTarget)) {
              handleChanged();
              closePopover();
            }
          }}
          onClick={() => {
            if (items.length > 0) {
              openPopover();
            }
          }}
          onKeyDownCapture={(e) => {
            if (!isOpen) {
              setIsOpen(true);
            }

            if (["ArrowDown"].includes(e.key)) {
              listRef.current?.focus();
            }

            if (["Enter"].includes(e.key)) {
              handleChanged();
              closePopover();
            }
          }}
          {...props}
        />

        <span
          className={cn("py-12", {
            "pr-6": showClearButton,
            "pr-12": !showClearButton,
          })}
        >
          {suffix}
        </span>

        <span
          ref={buttonRef}
          className={cn("pb-12 pt-14 cursor-pointer pr-10", {
            hidden: !showClearButton,
          })}
          aria-hidden="true"
          tabIndex={-1}
          role="button"
          onClick={() => {
            if (showClearButton) {
              changed.current = true;
              setInputValue("");
              onItemChange([]);
              handleChanged();
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          {showClearButton ? <X /> : <ChevronDown />}
        </span>
      </Group>
      {items.length > 0 && parentRef.current ? (
        <ComboboxPopover
          className={"max-h-[240px] overflow-y-auto"}
          UNSTABLE_portalContainer={parentRef.current}
          triggerRef={triggerRef}
          isOpen={isOpen}
          scrollRef={listRef}
          style={popoverStyle}
          isNonModal={true}
          maxHeight={240}
          offset={0}
        >
          <MultiselectListbox
            ref={listRef}
            allItems={originalItems}
            isFiltering={filtering}
            items={items}
            isOpen={isOpen}
            selectedIds={selectedIds}
            onItemChange={(keys) => {
              changed.current = true;
              onItemChange(keys);
            }}
            onBlur={(event) => {
              if (event.relatedTarget === inputRef.current) {
                return;
              }

              if (
                event.relatedTarget === null ||
                !(event.relatedTarget instanceof HTMLElement)
              ) {
                inputRef.current?.focus();
              } else {
                event.relatedTarget.focus();
              }

              handleChanged();
              closePopover();
            }}
            // onClose={(selectedKeys) => {
            //   if (selectedKeys === "all") {
            //     setInputValue(originalItems[0].label);
            //   } else if (selectedKeys.size > 0) {
            //     let firstItemIndex = -1;
            //     for (const newKey of selectedKeys) {
            //       const index = originalItems.findIndex((f) => f.id === newKey);
            //       if (firstItemIndex === -1 || index < firstItemIndex) {
            //         firstItemIndex = index;
            //       }
            //     }

            //     setInputValue(originalItems[firstItemIndex].label);
            //   } else {
            //     setInputValue("");
            //   }

            //   setIsOpen(false);
            // }}
          />
        </ComboboxPopover>
      ) : null}
    </div>
  );
}

function usePopoverStyle(elementRef: React.RefObject<HTMLDivElement>) {
  const [popoverStyle, setPopoverStyle] = React.useState({});
  React.useEffect(
    function updatePopoverStyle() {
      const element = elementRef.current;

      const handleWidthChange = () => {
        if (element) {
          setPopoverStyle({ width: element.clientWidth });
        }
      };

      handleWidthChange();

      const resizeObserver = new ResizeObserver(handleWidthChange);
      if (element) {
        resizeObserver.observe(element);
      }

      return () => {
        if (element) {
          resizeObserver.unobserve(element);
        }
      };
    },
    [elementRef]
  );

  return popoverStyle;
}

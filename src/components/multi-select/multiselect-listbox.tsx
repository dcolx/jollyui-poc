import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Square, SquareCheck, SquareMinus } from "lucide-react";
import React, { forwardRef } from "react";
import type { Selection } from "react-aria-components";
import {
  type Header,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
} from "react-aria-components";

import type { MultiselectProps } from "./";

export interface ComboboxLabelProps
  extends React.ComponentPropsWithoutRef<typeof Header> {
  separator?: boolean;
  offset?: boolean;
}

type CheckboxAlignment = "left" | "right";

type ComboboxItemProps = {
  suffix?: string;
  checkboxAlignment: CheckboxAlignment;
} & ListBoxItemProps &
  VariantProps<typeof comboboxItemVariants>;

type ComboboxAllProps = {
  indeterminate?: boolean;
  allSelected?: boolean;
  suffix?: string;
} & ComboboxItemProps;

const comboboxItemVariants = cva(
  ["flex", "justify-between", "py-8", "px-12", "cursor-pointer"],
  {
    variants: {
      intent: {
        primary: [""],
        secondary: [""],
      },
      alignment: {
        left: [""],
        right: ["flex-row-reverse"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const ComboboxItemAll = ({
  children,
  intent,
  suffix,
  checkboxAlignment,
  indeterminate = false,
  allSelected = false,
  ...props
}: ComboboxAllProps) => {
  const variant = comboboxItemVariants({
    intent,
    alignment: checkboxAlignment,
  });
  return (
    <ListBoxItem className={variant} {...props}>
      {(values) => (
        <>
          <span className={"h-24 w-24 text-background-brand-primary mr-16"}>
            {indeterminate ? (
              <SquareMinus />
            ) : values.isSelected || allSelected ? (
              <SquareCheck />
            ) : (
              <Square />
            )}
          </span>

          <span className="w-full">
            {typeof children === "function" ? children(values) : children}
          </span>
        </>
      )}
    </ListBoxItem>
  );
};

const ComboboxItem = ({
  children,
  intent,
  suffix,
  checkboxAlignment,
  ...props
}: ComboboxItemProps) => {
  const variant = comboboxItemVariants({
    intent,
    alignment: checkboxAlignment,
  });
  return (
    <ListBoxItem className={variant} {...props}>
      {(values) => (
        <>
          <span className="h-24 w-24 text-background-brand-primary mr-16">
            {values.isSelected ? <SquareCheck /> : <Square />}
          </span>

          <span className="w-full">
            {typeof children === "function" ? children(values) : children}
          </span>

          <span className="h-full">{suffix ? suffix : null}</span>
        </>
      )}
    </ListBoxItem>
  );
};

type ExcludeAll<T> = T extends "all" ? never : T;
function untoggledAll(
  keys: ExcludeAll<Selection>,
  selectedKeys: Selection,
  maxLength: number
) {
  return selectedKeys === "all" && !keys.has("all") && keys.size === maxLength;
}

const SET_WITH_ALL = new Set(["all"]);

type MultiselectListboxProps = Pick<
  MultiselectProps,
  "onItemChange" | "selectedIds" | "items" | "suffix"
> &
  Pick<React.ComponentProps<typeof ListBox>, "onBlur"> & {
    allItems: MultiselectProps["items"];
    isFiltering: boolean;
    isOpen: boolean;
    checkboxAlignment?: CheckboxAlignment;
  };

export const MultiselectListbox = forwardRef(function MyInput(
  {
    onItemChange,
    allItems,
    items: itemsToShow,
    checkboxAlignment = "left",
    isFiltering,
    selectedIds,
    onBlur,
    isOpen,
    suffix,
    ...props
  }: MultiselectListboxProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const id = React.useId();

  const selectedKeys = React.useMemo<Selection>(() => {
    if (selectedIds.length === allItems.length) {
      return "all";
    }

    return new Set(selectedIds);
  }, [allItems.length, selectedIds]);

  return (
    <ListBox
      ref={ref}
      onBlur={onBlur}
      items={itemsToShow}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        if (keys === "all") {
          onItemChange(allItems.map((m) => m.id));
        } else if (keys.has("all")) {
          if (keys.size === 1) {
            onItemChange(allItems.map((m) => m.id));
          } else if (selectedKeys === "all") {
            onItemChange(
              Array.from(keys.difference(SET_WITH_ALL), (f) => f.toString())
            );
          } else {
            onItemChange(allItems.map((m) => m.id));
          }
        } else if (untoggledAll(keys, selectedKeys, allItems.length)) {
          onItemChange([]);
        } else {
          onItemChange(
            Array.from(keys.difference(SET_WITH_ALL), (f) => f.toString())
          );
        }
      }}
      {...props}
    >
      <>
        {!isFiltering ? (
          <ComboboxItemAll
            key={`${id}-all`}
            id={"all"}
            textValue={"Selecionar tudo"}
            checkboxAlignment={checkboxAlignment}
            indeterminate={
              selectedKeys !== "all" &&
              ![0, allItems.length].includes(selectedKeys.size)
            }
            allSelected={
              selectedKeys !== "all" && selectedKeys.size === allItems.length
            }
          >
            Selecionar tudo
          </ComboboxItemAll>
        ) : null}
        {itemsToShow.map((item) => {
          return (
            <ComboboxItem
              key={`${id}-${item.id}`}
              id={item.id}
              checkboxAlignment={checkboxAlignment}
              textValue={item.label}
              suffix={suffix}
            >
              {item.label}
            </ComboboxItem>
          );
        })}
      </>
    </ListBox>
  );
});

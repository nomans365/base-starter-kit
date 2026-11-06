roze-web-cms-frontend-nuxt/
├── .gitignore
├── README.md
├── nuxt.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── app/
│   ├── app.vue
│   ├── error.vue
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── CommonGridShape.vue
│   │   │   └── PageBreadcrumb.vue
│   │   ├── full-width-pages/
│   │   │   ├── auth/
│   │   │   ├── sign-in/
│   │   │   │   ├── Form.vue
│   │   │   │   ├── Header.vue
│   │   │   │   ├── SignInPage.vue
│   │   │   │   ├── data.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── types.ts
│   │   │   └── (auth files)
│   │   │       ├── Divider.vue
│   │   │       └── ThemeToggler.vue
│   │   │   └── error-404/
│   │   │       ├── Error404.vue
│   │   │       ├── index.ts
│   │   │       └── types.ts
│   │   ├── icons/
│   │   │   └── layout/
│   │   │       ├── AiIcon.vue
│   │   │       ├── AirbnbIcon.vue
│   │   │       ├── AlertIcon.vue
│   │   │       ├── AmazonIcon.vue
│   │   │       ├── AngleDownIcon.vue
│   │   │       ├── AngleUpIcon.vue
│   │   │       ├── AppleIcon.vue
│   │   │       ├── ArchiveIcon.vue
│   │   │       ├── ArrowDownIcon.vue
│   │   │       ├── ArrowLeftIcon.vue
│   │   │       ├── ArrowLeftRightIcon.vue
│   │   │       ├── ArrowRightIcon.vue
│   │   │       ├── ArrowUpIcon.vue
│   │   │       ├── AspectFullscreenIcon.vue
│   │   │       ├── AspectPortraitIcon.vue
│   │   │       ├── AspectSquareIcon.vue
│   │   │       ├── BoxIcon.vue
│   │   │       ├── BoxTappedIcon.vue
│   │   │       ├── CalendarIcon.vue
│   │   │       ├── CheckIcon.vue
│   │   │       ├── ChevronDownIcon.vue
│   │   │       ├── ChevronLeftIcon.vue
│   │   │       ├── ChevronRightIcon.vue
│   │   │       ├── ChevronUpDownIcon.vue
│   │   │       ├── ChevronUpIcon.vue
│   │   │       ├── EyeCloseIcon.vue
│   │   │       ├── EyeIcon.vue
│   │   │       ├── GearIcon.vue
│   │   │       ├── GlobeIcon.vue
│   │   │       ├── GoogleIcon.vue
│   │   │       ├── HorizontalDotsIcon.vue
│   │   │       ├── HorizontalSlideIcon.vue
│   │   │       ├── InfoCircleIcon.vue
│   │   │       ├── LayoutGridIcon.vue
│   │   │       ├── LayoutIcon.vue
│   │   │       ├── ListIcon.vue
│   │   │       ├── LogOutIcon.vue
│   │   │       ├── MenuTwoIcon.vue
│   │   │       ├── MoonIcon.vue
│   │   │       ├── MovingBoxIcon.vue
│   │   │       ├── PageIcon.vue
│   │   │       ├── PieChartIcon.vue
│   │   │       ├── PluginIcon.vue
│   │   │       ├── SearchIcon.vue
│   │   │       ├── StarIcon.vue
│   │   │       ├── SunIcon.vue
│   │   │       ├── SystemIcon.vue
│   │   │       ├── TableIcon.vue
│   │   │       ├── TwitterXIcon.vue
│   │   │       ├── UserCircleIcon.vue
│   │   │       ├── XIcon.vue
│   │   │       └── index.ts
│   │   └── ui/
│   │       ├── alert/
│   │       │   ├── Alert.vue
│   │       │   ├── AlertAction.vue
│   │       │   ├── AlertDescription.vue
│   │       │   ├── AlertTitle.vue
│   │       │   ├── index.ts
│   │       │   └── variants.ts
│   │       ├── avatar/
│   │       │   ├── Avatar.vue
│   │       │   ├── AvatarBadge.vue
│   │       │   ├── AvatarFallback.vue
│   │       │   ├── AvatarGroup.vue
│   │       │   ├── AvatarGroupCount.vue
│   │       │   ├── AvatarImage.vue
│   │       │   └── index.ts
│   │       ├── badge/
│   │       │   ├── Badge.vue
│   │       │   └── index.ts
│   │       ├── button-group/
│   │       │   ├── ButtonGroup.vue
│   │       │   └── index.ts
│   │       ├── button/
│   │       │   ├── Button.vue
│   │       │   ├── index.ts
│   │       │   └── variants.ts
│   │       ├── card/
│   │       │   ├── Card.vue
│   │       │   ├── CardAction.vue
│   │       │   ├── CardContent.vue
│   │       │   ├── CardDescription.vue
│   │       │   ├── CardFooter.vue
│   │       │   ├── CardHeader.vue
│   │       │   ├── CardTitle.vue
│   │       │   └── index.ts
│   │       ├── checkbox/
│   │       │   ├── Checkbox.vue
│   │       │   └── index.ts
│   │       ├── collapsible/
│   │       │   ├── Collapsible.vue
│   │       │   ├── CollapsibleContent.vue
│   │       │   ├── CollapsibleTrigger.vue
│   │       │   └── index.ts
│   │       ├── combobox/
│   │       │   ├── Combobox.vue
│   │       │   ├── ComboboxAnchor.vue
│   │       │   ├── ComboboxChip.vue
│   │       │   ├── ComboboxChips.vue
│   │       │   ├── ComboboxChipsInput.vue
│   │       │   ├── ComboboxClear.vue
│   │       │   ├── ComboboxContent.vue
│   │       │   ├── ComboboxEmpty.vue
│   │       │   ├── ComboboxGroup.vue
│   │       │   ├── ComboboxInput.vue
│   │       │   ├── ComboboxItem.vue
│   │       │   ├── ComboboxItemIndicator.vue
│   │       │   ├── ComboboxLabel.vue
│   │       │   ├── ComboboxPortal.vue
│   │       │   ├── ComboboxSeparator.vue
│   │       │   ├── ComboboxTrigger.vue
│   │       │   ├── ComboboxValue.vue
│   │       │   └── index.ts
│   │       ├── dialog/
│   │       │   ├── Dialog.vue
│   │       │   ├── DialogClose.vue
│   │       │   ├── DialogContent.vue
│   │       │   ├── DialogDescription.vue
│   │       │   ├── DialogFooter.vue
│   │       │   ├── DialogHeader.vue
│   │       │   ├── DialogOverlay.vue
│   │       │   ├── DialogPortal.vue
│   │       │   ├── DialogTitle.vue
│   │       │   ├── DialogTrigger.vue
│   │       │   └── index.ts
│   │       ├── dropdown-menu/
│   │       │   ├── DropdownMenu.vue
│   │       │   ├── DropdownMenuCheckboxItem.vue
│   │       │   ├── DropdownMenuContent.vue
│   │       │   ├── DropdownMenuGroup.vue
│   │       │   ├── DropdownMenuItem.vue
│   │       │   ├── DropdownMenuLabel.vue
│   │       │   ├── DropdownMenuPortal.vue
│   │       │   ├── DropdownMenuRadioGroup.vue
│   │       │   ├── DropdownMenuRadioItem.vue
│   │       │   ├── DropdownMenuSeparator.vue
│   │       │   ├── DropdownMenuShortcut.vue
│   │       │   ├── DropdownMenuSub.vue
│   │       │   ├── DropdownMenuSubContent.vue
│   │       │   ├── DropdownMenuSubTrigger.vue
│   │       │   ├── DropdownMenuTrigger.vue
│   │       │   └── index.ts
│   │       ├── field/
│   │       │   ├── Field.vue
│   │       │   ├── FieldContent.vue
│   │       │   ├── FieldDescription.vue
│   │       │   ├── FieldError.vue
│   │       │   ├── FieldGroup.vue
│   │       │   ├── FieldLabel.vue
│   │       │   ├── FieldTitle.vue
│   │       │   └── index.ts
│   │       ├── file-input/
│   │       │   ├── FileInput.vue
│   │       │   └── index.ts
│   │       ├── input-group/
│   │       │   ├── InputGroup.vue
│   │       │   ├── InputGroupAddon.vue
│   │       │   ├── InputGroupButton.vue
│   │       │   ├── InputGroupInput.vue
│   │       │   ├── InputGroupText.vue
│   │       │   ├── InputGroupTextarea.vue
│   │       │   └── index.ts
│   │       ├── input/
│   │       │   ├── Input.vue
│   │       │   └── index.ts
│   │       ├── label/
│   │       │   ├── Label.vue
│   │       │   └── index.ts
│   │       ├── pagination/
│   │       │   ├── Pagination.vue
│   │       │   ├── PaginationContent.vue
│   │       │   ├── PaginationEllipsis.vue
│   │       │   ├── PaginationItem.vue
│   │       │   ├── PaginationLink.vue
│   │       │   ├── PaginationNext.vue
│   │       │   ├── PaginationPrevious.vue
│   │       │   └── index.ts
│   │       ├── radio-group/
│   │       │   ├── RadioGroup.vue
│   │       │   ├── RadioGroupItem.vue
│   │       │   └── index.ts
│   │       ├── scroll-area/
│   │       │   ├── ScrollArea.vue
│   │       │   ├── ScrollBar.vue
│   │       │   └── index.ts
│   │       ├── select/
│   │       │   ├── Select.vue
│   │       │   ├── SelectContent.vue
│   │       │   ├── SelectGroup.vue
│   │       │   ├── SelectItem.vue
│   │       │   ├── SelectLabel.vue
│   │       │   ├── SelectPortal.vue
│   │       │   ├── SelectScrollDownButton.vue
│   │       │   ├── SelectScrollUpButton.vue
│   │       │   ├── SelectSeparator.vue
│   │       │   ├── SelectTrigger.vue
│   │       │   ├── SelectValue.vue
│   │       │   └── index.ts
│   │       ├── sidebar/
│   │       │   ├── Sidebar.vue
│   │       │   ├── SidebarContent.vue
│   │       │   ├── SidebarGroup.vue
│   │       │   ├── SidebarGroupContent.vue
│   │       │   ├── SidebarGroupLabel.vue
│   │       │   ├── SidebarHeader.vue
│   │       │   ├── SidebarInset.vue
│   │       │   ├── SidebarMenu.vue
│   │       │   ├── SidebarMenuButton.vue
│   │       │   ├── SidebarMenuItem.vue
│   │       │   ├── SidebarProvider.vue
│   │       │   └── index.ts
│   │       ├── switch/
│   │       │   ├── Switch.vue
│   │       │   └── index.ts
│   │       ├── table/
│   │       │   ├── Table.vue
│   │       │   ├── TableBody.vue
│   │       │   ├── TableCell.vue
│   │       │   ├── TableHeader.vue
│   │       │   ├── TableRow.vue
│   │       │   └── index.ts
│   │       ├── textarea/
│   │       │   ├── Textarea.vue
│   │       │   └── index.ts
│   │       └── video/
│   │           ├── Video.vue
│   │           └── index.ts
│   ├── composables/
│   │   ├── useFormValidation.ts
│   │   ├── useRTL.ts
│   │   ├── useSidebar.ts
│   │   └── useTheme.ts
│   ├── layouts/
│   │   ├── AdminLayout.vue
│   │   ├── AuthLayout.vue
│   │   ├── SidebarProvider.vue
│   │   ├── ThemeProvider.vue
│   │   ├── app-layout/
│   │   │   ├── header/
│   │   │   │   └── AppHeader.vue
│   │   │   └── sidebar/
│   │   │       ├── AppSidebar.vue
│   │   │       ├── SidebarHeader.vue
│   │   │       ├── SidebarMenuItem.vue
│   │   │       ├── SidebarNavGroup.vue
│   │   │       ├── SidebarSubmenuItem.vue
│   │   │       ├── data.ts
│   │   │       └── types.ts
│   │   └── header/
│   │       ├── theme-toggler/
│   │       │   └── ThemeToggler.vue
│   │       └── user-dropdown/
│   │           └── UserDropdown.vue
│   ├── pages/
│   │   ├── index.vue
│   │   └── login.vue
│   └── utils/
│       ├── cn.ts
│       ├── focusOnOpen.ts
│       ├── get-initials.ts
│       ├── index.ts
│       └── useVModel.ts
└── public/
    ├── favicon.ico
    ├── robots.txt
    └── images/
        ├── error/
        │   ├── 404-dark.svg
        │   ├── 404.svg
        │   ├── 500-dark.svg
        │   ├── 500.svg
        │   ├── 503-dark.svg
        │   ├── 503.svg
        │   ├── maintenance-dark.svg
        │   ├── maintenance.svg
        │   ├── success-dark.svg
        │   └── success.svg
        ├── icons/
        │   ├── file-image-dark.svg
        │   ├── file-image.svg
        │   ├── file-pdf-dark.svg
        │   ├── file-pdf.svg
        │   ├── file-video-dark.svg
        │   ├── file-video.svg
        │   ├── flag-de.svg
        │   ├── flag-es.svg
        │   ├── flag-sa.svg
        │   └── flag-us.svg
        ├── logo/
        │   ├── RR-dashboard-logo.svg
        │   ├── auth-logo.svg
        │   ├── logo.svg
        │   └── rozeremit_logo.svg
        ├── shape/
        │   └── grid-01.svg
        └── user/
            └── owner.png
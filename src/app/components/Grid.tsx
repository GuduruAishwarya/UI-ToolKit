'use client';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {DragEvent} from 'react';
import {twMerge} from 'tailwind-merge';
import Button from '@/components/Button';
import Icon , {IconVariants}from '@/components/Icon';
import type {SelectChange, SelectOption} from '@/components/Select';
import Select from '@/components/Select';
import Text from '@/components/Text';
import Typography from '@/components/Typography';
import {usePathname, useSearchParams} from 'next/navigation';
import { useRouter } from "next/navigation";
import useDebounce from '@/utils/hooks/useDebounce';
import Spinner from './Spinner';

export const DEFAULT_PAGE_ROWS = [10, 20, 30];
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

type Record<T = object> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x in keyof T]: any;
} & {
  _id?: string | number;
  guid?: string | number;
};

export type GridColumns<T> = {
  header: string | JSX.Element;
  width?: number;
  identifier?: keyof T;
  grow?: boolean;
  renderCell?: (row: T) => JSX.Element;
  fieldStyles?: string;
};

export enum PaginationModes {
  CLIENT = 'client',
  SERVER = 'server',
}

export type GridPagination = {
  onPageChange?: (currentPage: number, rowsPerPage: number, search: string, pill?: string) => void;
  totalRows?: number;
  mode?: PaginationModes;
  shouldPaginate?: boolean;
};

export type GridFilterPill = {pill: string};

type GridProps<T> = {
  rows: Record<T>[];
  title?: string;
  columns: GridColumns<T>[];
  isDraggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>, row: T) => void;
  onDragOver?: (e: DragEvent<HTMLDivElement>, row: T) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>, row: T) => void;
  onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
  includeSearch?: boolean;
  toolBarProps?: JSX.Element;
  className?: string;
  styles?: {
    searchContainer?: string;
    rowStyles?: string;
    headerStyles?: string;
  };
  collapsible?: boolean;
  pagination?: GridPagination;
  onRowClick?: (row: Record<T>) => void;
  filterPills?: GridFilterPill[];
  showSpinner?: boolean;
};

const getElementLeftRightPadding = (el: HTMLElement) => {
  return Number(getComputedStyle(el).paddingLeft.replace('px', '')) + Number(getComputedStyle(el).paddingRight.replace('px', ''));
};

const Grid = <T = Record,>({
  rows,
  columns,
  isDraggable = false,
  onDragOver,
  onDragStart,
  onDrop,
  onDragLeave,
  includeSearch = false,
  toolBarProps,
  className,
  title,
  collapsible,
  styles: {rowStyles, headerStyles, searchContainer} = {},
  pagination,
  onRowClick,
  showSpinner,
  filterPills,
}: GridProps<T>) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const {
    totalRows = rows.length,
    onPageChange,
    shouldPaginate = pagination ? true : false,
    mode = PaginationModes.CLIENT,
  } = pagination || ({} as GridPagination);
  const [adjustWidth, setAdjustWidth] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePill, setActivePill] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const paginationHeight = shouldPaginate ? 70 : 0,
    searchAndHeaderHeight = includeSearch ? 105 : 61;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const changeSearchParams = useCallback(
    (pageNumber: number, rowsPerPage: number, search: string, pill?: string) => {
      const sparams = new URLSearchParams(searchParams);
      sparams.set('page', pageNumber.toString());
      sparams.set('pageSize', rowsPerPage.toString());
      sparams.set('search', search);
      if (pill !== undefined) sparams.set('pill', pill);
      router.replace(pathName + '?' + sparams.toString());
    },
    [searchParams],
  );
  useEffect(() => {
    if (headerRef.current && tableRef.current) {
      //vertical Scroll width
      const scrollWidth = (rowsRef.current?.offsetWidth || 0) - (rowsRef.current?.clientWidth || 0);

      const tableWidthAfterPaddingRemoval =
        tableRef.current.clientWidth - getElementLeftRightPadding(headerRef.current) - (scrollWidth + 1);

      if (headerRef.current.clientWidth < tableWidthAfterPaddingRemoval) {
        const growWidthColumns = columns.filter((x) => x.grow);
        const fixedWidthColumns = columns.filter((x) => !x.grow);

        if (growWidthColumns.length) {
          let fixedWidthSum = 0;
          fixedWidthColumns.forEach((x) => (x.width ? (fixedWidthSum += x.width) : undefined));

          const sharableWidth = tableWidthAfterPaddingRemoval - fixedWidthSum;

          setAdjustWidth(sharableWidth / growWidthColumns.length);
        }
      }
    }
  });

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search') || '';
  const pill = searchParams.get('pill') || '';

  useEffect(() => {
    if (page && pageSize) {
      let pageNo = parseInt(page);
      let pageSizeVal = parseInt(pageSize);
      if (isNaN(pageNo)) {
        pageNo = DEFAULT_PAGE;
      }
      if (isNaN(pageSizeVal)) {
        pageSizeVal = DEFAULT_PAGE_SIZE;
      }
      if (searchValue !== search) {
        setSearchValue(search);
      }
      if (currentPage !== pageNo) {
        setCurrentPage(pageNo);
      }
      if (activePill !== pill) setActivePill(pill);
      if (rowsPerPage !== pageSizeVal) {
        if (DEFAULT_PAGE_ROWS.includes(pageSizeVal)) {
          setRowsPerPage(pageSizeVal);
        } else {
          setRowsPerPage(DEFAULT_PAGE_SIZE);
          changeSearchParams(currentPage, DEFAULT_PAGE_SIZE, search);
        }
      }

      onPageChange?.(pageNo, pageSizeVal, search, pill);
    } else {
      changeSearchParams(currentPage, DEFAULT_PAGE_SIZE, search);
      onPageChange?.(DEFAULT_PAGE, DEFAULT_PAGE_SIZE, search, pill);
    }
  }, [page, pageSize, search, pill]);

  const rowsSelection = useMemo(() => {
    return DEFAULT_PAGE_ROWS.map((row): SelectOption => ({label: row.toString(), value: row}));
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = -1 * e.currentTarget.scrollLeft;
    if (headerRef.current) {
      headerRef.current.style.transform = `translateX(${scrollLeft}px)`;
    }
  };

  const handleSearch = useDebounce((text: string) => {
    changeSearchParams(DEFAULT_PAGE, rowsPerPage, text);
  }, 400);

  const handlePageSizeChange = ({option: {value}}: SelectChange) => {
    const selectedValue = value as number;
    setRowsPerPage(selectedValue);
    let currentPageNo = currentPage;
    if (selectedValue * currentPage > totalRows) {
      currentPageNo = Math.ceil(totalRows / selectedValue);
      setCurrentPage(currentPageNo);
    }
    changeSearchParams(currentPageNo, selectedValue, searchValue);
  };

  const filteredRows = useMemo(() => {
    if (mode === PaginationModes.CLIENT) {
      return rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    } else {
      return rows;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rows, rowsPerPage, rows.length]);

  useEffect(() => {
    if (totalRows !== 0 && rows.length === 0) {
      changeSearchParams(Math.ceil(totalRows / rowsPerPage), rowsPerPage, searchValue);
    }
  }, [rows.length]);
  return (
    <div
      className={twMerge('flex flex-col bg-base-color overflow-hidden border-2 rounded-[10px] relative min-h-[100px]', className)}
      ref={tableRef}>
      {showSpinner && <Spinner className="absolute top-0 left-0 right-0 bottom-0 h-full" />}
      {(includeSearch || toolBarProps || title) && (
        <div className={`flex flex-col gap-4 ${searchContainer}`}>
          <div className={`flex items-center flex-grow bg-transparent border-b border-b-base-200 py-2`}>
            {includeSearch && (
              <>
                <div className="h-10 w-10 flex items-center justify-center">
                  <Icon name="search" />
                </div>

                <Text
                  className={'flex-grow'}
                  styles={{
                    inputWrapper: 'border-none bg-base-100',
                    input: 'bg-base-100',
                  }}
                  label=""
                  value={searchValue}
                  placeholder={'Search...'}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    // onSearch(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          {filterPills && (
            <div className="flex gap-2 py-2">
              {filterPills.map(({pill}) => {
                return (
                  <div
                    key={pill}
                    className={`px-3 h-max py-1 rounded-[17px] border flex items-center gap-1 text-xs font-[700] w-fit cursor-pointer ${
                      activePill === pill
                        ? 'border-neutral-high-contrast bg-neutral-low-contrast text-neutral-high-contrast'
                        : 'border-base-500 text-base-500'
                    }`}
                    onClick={() => {
                      if (activePill === pill) {
                        setActivePill('');
                        changeSearchParams(1, rowsPerPage, searchValue, '');
                      } else {
                        setActivePill(pill);
                        changeSearchParams(1, rowsPerPage, searchValue, pill);
                      }
                    }}>
                    {pill}
                  </div>
                );
              })}
            </div>
          )}
          {title && (
            <div className={'flex gap-2.5'}>
              {collapsible && (
                <Button variant="none" onClick={() => setIsExpanded(!isExpanded)} className={'p-0 min-w-[unset]'}>
                  <Icon name={isExpanded ? 'collapse' : 'expand'} />
                </Button>
              )}
              <Typography mode="bolder">{title}</Typography>
            </div>
          )}
          {toolBarProps && <div className={'self-end'}>{toolBarProps}</div>}
        </div>
      )}
      <div className={`flex flex-col overflow-hidden`}>
        <div
          className={twMerge(
            'flex px-5 py-2.5 relative items-center border-b border-base-300 w-fit ',
            'min-h-[60px] items-center',
            rowStyles,
            !columns.filter((x) => x.header).length && 'h-0 min-h-0 invisible',
            headerStyles,
          )}
          ref={headerRef}>
          {columns.filter((x) => x.header).length > 0
            ? columns.map((column, index) => {
                const colWidth = column.grow && adjustWidth ? adjustWidth : column.width;
                return (
                  <Typography
                    mode="bolder"
                    className={`whitespace-nowrap flex-grow ${column.fieldStyles}`}
                    style={{
                      minWidth: colWidth,
                      width: colWidth,
                      maxWidth: colWidth,
                    }}
                    key={index}>
                    {column.header}
                  </Typography>
                );
              })
            : ''}
        </div>

        {isExpanded && (
          <>
            <div
              ref={rowsRef}
              className={`overflow-auto max-h-[calc(100%-${paginationHeight + searchAndHeaderHeight}px)]`}
              onScroll={handleScroll}>
              {filteredRows.map((row) => {
                return (
                  <div
                    draggable={isDraggable}
                    className={twMerge(
                      'flex py-2 px-5 relative items-center border-b border-base-200 ',
                      isDraggable ? 'cursor-grab active:cursor-grabbing ' : 'cursor-pointer',
                      rowStyles,
                    )}
                    onDragStart={(e) => onDragStart?.(e, row)}
                    onDragOver={(e) => onDragOver?.(e, row)}
                    onDrop={(e) => onDrop?.(e, row)}
                    onDragLeave={(e) => onDragLeave?.(e)}
                    key={row._id}
                    onClick={() => onRowClick?.(row)}>
                    {columns.map((col, index) => {
                      const colWidth = col.grow && adjustWidth ? adjustWidth : col.width;
                      return (
                        <div
                          draggable="false"
                          className={`whitespace-nowrap flex-grow text-base ${col.fieldStyles}`}
                          style={{
                            minWidth: colWidth,
                            width: colWidth,
                            maxWidth: colWidth,
                          }}
                          key={row._id ? row._id.toString() : row.guid?.toString()}>
                          {col.renderCell ? col.renderCell(row) : col.identifier && <Typography>{row[col.identifier]}</Typography>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {shouldPaginate && filteredRows.length > 0 && totalRows > DEFAULT_PAGE_ROWS[0] ? (
              <div className={`flex justify-between p-4 items-center `}>
                <div className={'flex items-center justify-between'}>
                  <Select
                    label=""
                    name=""
                    options={rowsSelection}
                    value={rowsPerPage}
                    textInputStyles={{
                      input: 'max-w-[35px] min-h-[40px] py-0 pl-3 text-secondary font-bold',
                    }}
                    styles={{inputWrapper: 'p-0 pr-3 gap-2'}}
                    onSelectChange={handlePageSizeChange}
                  />
                  <Typography className="text-sm px-4">per page</Typography>
                </div>
                <div className={'flex items-center gap-4'}>
                  <Typography mode="bolder" className="text-sm">
                    {`${(currentPage - 1) * rowsPerPage + 1}-${
                      currentPage * rowsPerPage > totalRows ? totalRows : currentPage * rowsPerPage
                    } `}
                    <span className="font-normal">of</span> {`${totalRows}`}
                  </Typography>
                  <div className={'flex'}>
                    <Button
                      variant="secondary"
                      className="w-10 h-10 border border-base-200 rounded-[unset] min-w-[unset] p-[7px] rounded-l-md border-r-0 rounded-r-none"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        changeSearchParams(currentPage - 1, rowsPerPage, searchValue);
                      }}>
                      <Icon name="chevron-left" className="text-base-700" />
                    </Button>
                    <Button
                      variant="secondary"
                      className={'w-10 h-10 border border-base-200 rounded-none min-w-[unset] p-[7px] rounded-r-md'}
                      disabled={currentPage === Math.ceil(totalRows / rowsPerPage)}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        changeSearchParams(currentPage + 1, rowsPerPage, searchValue);
                      }}>
                      <Icon name="chevron-right" className="text-base-700" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Grid;

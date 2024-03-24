'use client';
import type {FC} from 'react';
import {useState} from 'react';
import Card from './Card';
import Button from './Button';

export type ToggleProps = {
  isCardEditable?: boolean;
  saveText: string | 'Save';
  cancelText: string | 'Cancel';
  cardHeader?: string | JSX.Element;
  cardEditableBody?: string | JSX.Element;
  toggleText?: string | JSX.Element;
  DisableSave?: boolean;
  saveHandler?: () => void;
  cancelHandler?: () => void;
  name?: string;
  children: React.ReactNode | string | JSX.Element;
};

const EditableCard: FC<ToggleProps> = ({
  cardEditableBody,
  isCardEditable,
  cardHeader,
  toggleText,
  DisableSave,
  name,
  saveText,
  cancelText,
  saveHandler,
  cancelHandler,
  children,
}: ToggleProps) => {
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      <Card className="flex flex-col w-full py-6 px-0 border-[1px] gap-2 border-base-200">
        <div className="text-base-700 px-6 flex flex-col gap-8 py-1.5">{cardHeader}</div>
        <div
          className={`px-6 border-t pt-4
          ${enableEdit ? 'flex flex-col' : 'flex'}`}>
          <div className="flex w-full flex-col gap-1.5">{enableEdit ? cardEditableBody : children}</div>
          {isCardEditable && (
            <div
              className={`flex 
            ${enableEdit ? 'justify-start gap-4 mt-5' : 'justify-end items-end'}`}>
              <Button
                variant="secondary"
                className="px-3 py-1.5"
                onClick={() => {
                  cancelHandler?.();
                  setEnableEdit(!enableEdit);
                }}>
                {enableEdit ? cancelText : toggleText}
              </Button>
              {enableEdit && (
                <Button
                  className="px-4 py-3.5"
                  disabled={DisableSave}
                  variant="primary"
                  onClick={() => {
                    saveHandler?.();
                    setEnableEdit(!enableEdit);
                  }}>
                  {saveText}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default EditableCard;

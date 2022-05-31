import {useIntl} from 'react-intl'
import { PrimitiveType, FormatXMLElementFn} from 'intl-messageformat'
import { ReactNode } from 'react';

type FormatMessageString = (
    id: string,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
) => string;

type FormatMessageNode = (id: string, value?: Record<string, PrimitiveType | ReactNode>) => ReactNode

export type FormatMessage = FormatMessageString & FormatMessageNode;

export const useFormatMessage = () => {
    // save hook to be reused 
    const intl = useIntl();

    // overload the function to support the various implementation

     function formatMessage(id: string, value?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>): string; 

     function formatMessage(id: string, values?: Record<string, PrimitiveType | ReactNode>): ReactNode;

    function formatMessage(id: string, value: any): any { 
        return intl.formatMessage({id}, value)
    }
    // return the fuction to be avaialble when using the hook
    return formatMessage;
}
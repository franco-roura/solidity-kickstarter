import { FieldInputProps, FormikErrors, FormikState, FormikTouched } from 'formik'
import { ProviderConnectInfo, ProviderMessage, ProviderRpcError, RequestArguments } from 'hardhat/types'

import { Contract } from '@/types/web3-eth-contract'

export type FactoryContract = Contract<'createCampaign' | 'getDeployedCampaigns'>
export type CampaignContract = Contract<
  'contribute' |
  'createRequest' |
  'approveRequest' |
  'finalizeRequest' |
  'requests' |
  'manager' |
  'minimumContribution' |
  'approversCount' |
  'approvers' |
  'getCampaignSummary' |
  'getRequestsCount'
>

export interface EthereumEvent {
  connect: ProviderConnectInfo;
  disconnect: ProviderRpcError;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: ProviderMessage
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export interface Ethereumish {
    autoRefreshOnNetworkChange: boolean;
    chainId: string;
    isMetaMask?: boolean;
    isStatus?: boolean;
    networkVersion: string;
    selectedAddress: any;

    on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
    enable(): Promise<any>;
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
    /**
     * @deprecated
     */
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    sendAsync: (request: RequestArguments) => Promise<unknown>
}

export type StringHashmap = Record<string, string | number>
export type FormikObj<T extends StringHashmap> = {
  initialValues: T
  values: T
  touched: FormikTouched<T>
  errors: FormikErrors<T>
  resetForm: (nextState?: Partial<FormikState<T>> | undefined) => void;
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleReset: (e: any) => void;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>
}

declare global {
    interface Window {
        ethereum: Ethereumish;
        web3: any
    }
}
export { }
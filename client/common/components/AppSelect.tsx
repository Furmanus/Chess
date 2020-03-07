import * as React from 'react';
import {OptionData} from '../interfaces/data';
import {AppStyledSelect} from '../styled/AppStyledSelect';
import {noop} from '../utils/utils';
import {SyntheticEvent} from 'react';
import {boundMethod} from 'autobind-decorator';

interface AppSelectProps {
    readonly defaultValue?: string;
    readonly options?: OptionData[];
    readonly onChange?: (value: string) => void;
    readonly disabled?: boolean;
}

export class AppSelect extends React.Component<AppSelectProps, {}> {
    public static defaultProps: Partial<AppSelectProps> = {
        defaultValue: '',
        options: [],
        onChange: noop,
        disabled: false,
    };
    public render(): React.ReactNode {
        const {
            options,
            defaultValue,
            disabled,
        } = this.props;

        return (
            <AppStyledSelect
                onChange={this.onSelectedOptionChange}
                defaultValue={defaultValue}
                disabled={disabled}
            >
                {options.map((option: OptionData, index: number) => (
                    <option
                        value={option.value}
                        key={option.value + index}
                    >
                        {option.label}
                    </option>
                ))}
            </AppStyledSelect>
        );
    }
    @boundMethod
    private onSelectedOptionChange(e: SyntheticEvent): void {
        const {
            onChange,
            disabled,
        } = this.props;

        if (!disabled) {
            onChange((e.target as HTMLSelectElement).value);
        }
    }
}
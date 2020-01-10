import * as React from 'react';
import {ChangeEvent} from 'react';
import {LoginPageStyledFormInputContainer} from './styled/LoginPageStyledFormInputContainer';

interface ILoginPageFormInputProps {
    id: string;
    name: string;
    type: 'text' | 'password';
    labelText: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    value?: string;
}

export class LoginPageFormInput extends React.Component<ILoginPageFormInputProps> {
    public static defaultProps = {
        value: '',
        name: '',
        isFocused: false,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
    };
    public render(): React.ReactNode {
        const {
            id,
            name,
            type,
            labelText,
            value,
            onChange,
            onFocus,
            onBlur,
            isFocused,
        } = this.props;
        const showPlaceholder = !isFocused && value.length === 0;

        return (
            <LoginPageStyledFormInputContainer
                showPlaceholder={showPlaceholder}
                isFocused={isFocused}
            >
                <label
                    htmlFor={id}
                >
                    {labelText}
                </label>
                <fieldset>
                    <legend>{showPlaceholder ? ' ' : labelText}</legend>
                </fieldset>
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </LoginPageStyledFormInputContainer>
        );
    }
}
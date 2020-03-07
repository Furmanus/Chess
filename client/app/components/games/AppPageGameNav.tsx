import * as React from 'react';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import {AppButton} from '../../../common/components/AppButton';
import {appPageTranslations, Languages} from '../../constants/app_translations';
import {GamesFilter} from '../../constants/app_games';
import {AppSelect} from '../../../common/components/AppSelect';

interface AppPageGameNavProps {
    onCreateGameClick: () => void;
    onFilterChange: (value: string) => void;
    shouldBlockActions: boolean;
    selectedFilter: GamesFilter;
}
const selectValueToLabelMap = {
    [GamesFilter.All]: appPageTranslations[Languages.EN].games.filters.all,
    [GamesFilter.User]: appPageTranslations[Languages.EN].games.filters.user,
    [GamesFilter.Vacant]: appPageTranslations[Languages.EN].games.filters.vacant,
};
const selectOptions = Object.keys(selectValueToLabelMap).map((key: GamesFilter) => ({
    value: key,
    label: selectValueToLabelMap[key],
}));

export class AppPageGameNav extends React.Component<AppPageGameNavProps, {}> {
    public render(): React.ReactNode {
        const {
            onCreateGameClick,
            onFilterChange,
            shouldBlockActions,
            selectedFilter,
        } = this.props;

        return (
            <AppPageStyledSubPageHeading>
                <AppButton
                    width={128}
                    height={40}
                    type="button"
                    onClick={onCreateGameClick}
                    disabled={shouldBlockActions}
                >
                    {appPageTranslations[Languages.EN].games.create}
                </AppButton>
                <AppSelect
                    options={selectOptions}
                    defaultValue={selectedFilter}
                    onChange={onFilterChange}
                />
            </AppPageStyledSubPageHeading>
        );
    }
}
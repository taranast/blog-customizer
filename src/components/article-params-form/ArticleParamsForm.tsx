import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onSubmit: (formState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onChange: setIsFormOpen,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setIsFormOpen(!isFormOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setFormState((params) => ({
								...params,
								fontFamilyOption,
							}))
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(fontSizeOption) =>
							setFormState((params) => ({
								...params,
								fontSizeOption,
							}))
						}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={(fontColor) =>
							setFormState((params) => ({
								...params,
								fontColor,
							}))
						}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(backgroundColor) =>
							setFormState((params) => ({
								...params,
								backgroundColor,
							}))
						}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(contentWidth) =>
							setFormState((params) => ({
								...params,
								contentWidth,
							}))
						}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

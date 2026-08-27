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
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onChange: setIsFormOpen,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
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
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
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

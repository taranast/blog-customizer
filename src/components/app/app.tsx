import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [article, setArticle] = useState(defaultArticleState);

	const onReset = () => {
		setArticle(defaultArticleState);
	};

	const onSubmit = (form: ArticleStateType) => {
		setArticle(form);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': article.fontFamilyOption.value,
					'--font-size': article.fontSizeOption.value,
					'--font-color': article.fontColor.value,
					'--container-width': article.contentWidth.value,
					'--bg-color': article.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onSubmit} onReset={onReset} />
			<Article />
		</main>
	);
};

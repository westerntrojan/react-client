import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {Helmet} from 'react-helmet';

import Loader from '@components/common/loaders/Loader';
import Form from './components/Form';
import {editArticle} from '@store/articles/actions';
import {useRedirect, useArticle} from '@utils/hooks';
import {IArticleInputs} from './types';

const EditArticle: React.FC = () => {
	const {slug} = useParams();

	const [article, setArticleSlug] = useArticle();
	const {redirectTo} = useRedirect();

	const dispatch = useDispatch();

	useEffect(() => {
		if (slug) {
			setArticleSlug(slug);
		}
	}, [slug, setArticleSlug]);

	const handleArticleFormSubmit = async (updatedArticle: IArticleInputs): Promise<any> => {
		if (article) {
			const data: any = await dispatch(editArticle({...article, ...updatedArticle}));

			if (data.success) {
				redirectTo(`/article/${data.article.slug}`);
			}

			return data;
		}
	};

	if (!article) {
		return <Loader disableMargin />;
	}

	return (
		<section className='edit-article'>
			<Helmet>
				<title>Edit article / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{article && <Form article={article} handleSubmit={handleArticleFormSubmit} />}
		</section>
	);
};

export default EditArticle;

import { addPublicationJsonLd } from '@starter-kit/utils/seo/addPublicationJsonLd';
import { getAutogeneratedPublicationOG } from '@starter-kit/utils/social/og';
import request from 'graphql-request';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import PostItem from '../../components/PostItem';
import { Container } from '../../components/container';
import { AppProvider } from '../../components/contexts/appContext';
import { Footer } from '../../components/footer';
import { Layout } from '../../components/layout';
import {
	PostFragment,
	PublicationFragment,
	TagPostsByPublicationDocument,
	TagPostsByPublicationQuery,
	TagPostsByPublicationQueryVariables,
} from '../../generated/graphql';
import StaggerParent from '../../components/StaggerParent';

type Props = {
	posts: PostFragment[];
	publication: PublicationFragment;
	tag: string;
};

export default function Tag({ publication, posts, tag }: Props) {
	const title = `#${tag} - ${publication.title}`;

	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<title>{title}</title>
					<meta
						property="og:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<meta
						property="twitter:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(addPublicationJsonLd(publication)) }}
					/>
				</Head>
				<Container className="mx-auto flex max-w-5xl flex-col items-stretch gap-10 px-5 py-10">
					{/* <PersonalHeader /> */}
					<div className="flex flex-col gap-1 pt-5">
						<p className="font-bold uppercase text-slate-500 dark:text-neutral-400">Tag</p>
						<h1 className="text-4xl font-bold text-slate-900 dark:text-neutral-50">#{tag}</h1>
					</div>
					<div className=" text-slate-600 dark:text-neutral-300 md:max-w-screen-md">
						<ul className="flex flex-row flex-wrap items-center gap-2">
							<li key={tag}>
								<Link
									href={`/tag/${tag}`}
									className="block rounded-full border px-2 py-1 font-medium hover:bg-slate-50 dark:border-neutral-800 dark:hover:bg-neutral-800 md:px-4"
								>
									#{tag}
								</Link>
							</li>
							<Link
								href={`/`}
								className="block rounded-full border px-2 py-1 font-medium hover:bg-slate-50 dark:border-neutral-800 dark:hover:bg-neutral-800 md:px-4"
							>
								Clear
							</Link>
						</ul>
					</div>
					{posts.length > 0 && <StaggerParent className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{posts.map((post) => (
							<PostItem key={post.id} post={post} />
						))}
					</StaggerParent>}
				</Container>

				{/* <Container className="py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl lg:mx-0">
							<h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">Blog</h2>
							<p className="mt-2 text-lg leading-8 text-gray-300">
								Learn how to grow your business with our expert advice.
							</p>
						</div>
						<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
							{posts.map((post) => (
								<PostItem key={post.id} post={post} />
							))}
						</div>
						<div className='w-full mt-10 p-5 grid place-items-center'>
							{isLoading && <BiLoaderAlt className="animate-spin text-xl" />}
						</div>
						{pageInfo.hasNextPage && pageInfo.endCursor && (
							<Waypoint onEnter={loadMore} bottomOffset={'10%'} />
						)}
					</div>
				</Container> */}
			</Layout>
		</AppProvider>
	);
}

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	if (!params) {
		throw new Error('No params');
	}
	const data = await request<TagPostsByPublicationQuery, TagPostsByPublicationQueryVariables>(
		process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
		TagPostsByPublicationDocument,
		{
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
			first: 20,
			tagSlug: params.slug,
		},
	);

	const publication = data.publication;
	if (!publication) {
		return {
			notFound: true,
		};
	}
	const posts = publication.posts.edges.map((edge) => edge.node);

	return {
		props: {
			posts,
			publication,
			tag: params.slug,
		},
		revalidate: 1,
	};
};

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

import { PostFragment } from '../generated/graphql';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from "framer-motion";
import StaggerArticle from './StaggerArticle';


const PostItem = ({ post }: { post: PostFragment }) => {
    return (
        <StaggerArticle key={post.id} className="flex group  max-w-xl flex-col items-start justify-between">
            <motion.div layoutId={`cover:${post.id}`} className='w-full z-20 mb-4 overflow-hidden rounded-xl'>
                <Image height={336} width={640}
                    className="group-hover:scale-[105%] group-hover:shadow-md duration-300 transition-all w-full rounded-xl " src={post?.coverImage?.url || "#"} alt={post.title} />
            </motion.div>
            <div className="relative">
                <h3 className="mt-3 md:line-clamp-2 text-lg font-semibold leading-6 text-gray-100 group-hover:text-accent transition-colors">
                    <Link href={`/${post.slug}`}>
                        <span className=" absolute inset-0" />
                        {post.title}
                    </Link>
                </h3>
                <div className="mt-5 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.publishedAt} className="text-gray-200">
                        {new Date(post.publishedAt).toDateString()}
                    </time>
                    <p className="text-gray-200">
                        {post?.comments?.totalDocuments} Comments
                    </p>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">{post.brief}</p>
            </div>
            {/* <div className="relative mt-8 flex items-center gap-x-4">
				<Image height={20} width={20} src={post?.author?.profilePicture || "#"} alt={post.author.name} className="h-10 w-10 rounded-full bg-gray-50" />
				<div className="text-sm leading-6">
					<p className="font-semibold text-gray-100">
						<span className="absolute inset-0" />
						{post.author.name}
					</p>
					<p className="text-gray-600">{post?.author?.role}</p>
				</div>
			</div> */}
        </StaggerArticle>
    );
};
export default PostItem


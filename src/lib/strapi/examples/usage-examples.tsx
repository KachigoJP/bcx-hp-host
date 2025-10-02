/**
 * Usage Examples for Strapi API Client
 * 
 * This file contains practical examples of how to use the Strapi API client
 * in your React components.
 */

import React, { useState } from 'react';
import type { Article } from '../../../utils/interfaces/strapi_types';
import {
    articleService,
    authService,
    globalService,
    useFetchCollection,
    useFetchSingle,
} from '../index';

// ============================================================================
// Example 1: Fetch Collection with Hook
// ============================================================================

export function ArticleListExample() {
    const { data, loading, error, refetch, pagination } = useFetchCollection(
        articleService.getAll,
        {
            pagination: { page: 1, pageSize: 10 },
            populate: ['author', 'coverImage'],
            sort: ['createdAt:desc'],
            filters: {
                publishedAt: { $notNull: true },
            },
        }
    );

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Articles</h1>
            {data?.map((article: { id: number; attributes: Article }) => (
                <div key={article.id}>
                    <h2>{article.attributes.title}</h2>
                    <p>{article.attributes.content}</p>
                    <small>Published: {article.attributes.publishedAt}</small>
                </div>
            ))}

            {pagination && (
                <div>
                    <p>
                        Page {pagination.page} of {pagination.pageCount}
                    </p>
                    <p>Total articles: {pagination.total}</p>
                </div>
            )}

            <button onClick={refetch}>Refresh</button>
        </div>
    );
}

// ============================================================================
// Example 2: Fetch Single Entry with Hook
// ============================================================================

export function ArticleDetailExample({ id }: { id: number }) {
    const { data, loading, error } = useFetchSingle(
        articleService.getById,
        id,
        {
            populate: {
                author: { fields: ['name', 'email'] },
                coverImage: { fields: ['url', 'alternativeText'] },
            },
        }
    );

    if (loading) return <div>Loading article...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Article not found</div>;

    const article = data.attributes;

    return (
        <article>
            <h1>{article.title}</h1>
            {article.coverImage && (
                <img
                    src={article.coverImage.data.attributes.url}
                    alt={article.coverImage.data.attributes.alternativeText || article.title}
                />
            )}
            <div>{article.content}</div>
            {article.author && (
                <p>By: {article.author.data.attributes.name}</p>
            )}
        </article>
    );
}

// ============================================================================
// Example 3: Manual API Calls (without hooks)
// ============================================================================

export function ManualFetchExample() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await articleService.getAll({
                pagination: { pageSize: 5 },
                sort: ['publishedAt:desc'],
            });
            setArticles(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchArticles} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Articles'}
            </button>

            {error && <div>Error: {error}</div>}

            <div>
                {articles.map((article: { id: number; attributes: Article }) => (
                    <div key={article.id}>{article.attributes.title}</div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// Example 4: Authentication Flow
// ============================================================================

export function LoginExample() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await authService.login({
                identifier: email,
                password: password,
            });

            setUser(response.user);
            console.log('JWT Token:', response.jwt);
            // Token is automatically stored in localStorage
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    if (user) {
        return (
            <div>
                <p>Welcome, {user.username}!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">Login</button>
        </form>
    );
}

// ============================================================================
// Example 5: CRUD Operations (Create, Update, Delete)
// ============================================================================

export function ArticleCRUDExample() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const createArticle = async () => {
        try {
            const token = authService.getToken();
            if (!token) {
                setMessage('You must be logged in to create articles');
                return;
            }

            const newArticle = await articleService.create(
                {
                    title,
                    content,
                    slug: title.toLowerCase().replace(/\s+/g, '-'),
                },
                token
            );

            setMessage(`Article created with ID: ${newArticle.data.id}`);
            setTitle('');
            setContent('');
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const updateArticle = async (id: number) => {
        try {
            const token = authService.getToken();
            if (!token) {
                setMessage('You must be logged in to update articles');
                return;
            }

            await articleService.update(
                id,
                { title: 'Updated Title' },
                token
            );

            setMessage(`Article ${id} updated successfully`);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const deleteArticle = async (id: number) => {
        try {
            const token = authService.getToken();
            if (!token) {
                setMessage('You must be logged in to delete articles');
                return;
            }

            await articleService.delete(id, token);
            setMessage(`Article ${id} deleted successfully`);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Create New Article</h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={createArticle}>Create Article</button>

            <div>
                <h3>Update/Delete Operations</h3>
                <button onClick={() => updateArticle(1)}>Update Article 1</button>
                <button onClick={() => deleteArticle(1)}>Delete Article 1</button>
            </div>

            {message && <div>{message}</div>}
        </div>
    );
}

// ============================================================================
// Example 6: Global Settings (Single Type)
// ============================================================================

export function GlobalSettingsExample() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const data = await globalService.get({
                populate: '*',
            });
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSettings();
    }, []);

    if (loading) return <div>Loading settings...</div>;
    if (!settings) return <div>No settings found</div>;

    return (
        <div>
            <h1>{settings.siteName}</h1>
            <p>{settings.siteDescription}</p>
            <p>Email: {settings.email}</p>
            <p>Phone: {settings.phone}</p>
        </div>
    );
}

// ============================================================================
// Example 7: Advanced Filtering and Pagination
// ============================================================================

export function AdvancedFilterExample() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, loading, pagination } = useFetchCollection(
        articleService.getAll,
        {
            filters: {
                $or: [
                    { title: { $containsi: searchTerm } },
                    { content: { $containsi: searchTerm } },
                ],
                publishedAt: { $notNull: true },
            },
            pagination: { page, pageSize: 10 },
            sort: ['publishedAt:desc'],
            populate: ['author'],
        },
        {
            dependencies: [page, searchTerm],
        }
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <div>Loading...</div>}

            <div>
                {data?.map((article) => (
                    <div key={article.id}>
                        <h3>{article.attributes.title}</h3>
                    </div>
                ))}
            </div>

            {pagination && (
                <div>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {pagination.pageCount}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= pagination.pageCount}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}


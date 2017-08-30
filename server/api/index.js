import { Router } from 'express'
import articles from './articles'

const router = Router()

// Add ARTICLES Routes
router.use(articles)

export default router

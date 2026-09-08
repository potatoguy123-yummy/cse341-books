/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: b1
 *         authorId:
 *           type: string
 *           example: a1
 *         title:
 *           type: string
 *           example: Patterns of Light
 *         publicationDate:
 *           type: string
 *           example: "2021-08-17"
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: a1
 *         name:
 *           type: string
 *           example: Maya Rivera
 *         birthYear:
 *           type: integer
 *           example: 1980
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Internal server error
 */
export {};

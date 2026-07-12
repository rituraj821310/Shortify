import {
  getShortUrl,
  getAllShortUrls,
  deleteShortUrl,
} from "../dao/short_url.js";

import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";

import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;

  let shortUrl;

  if (req.user) {
    shortUrl = await createShortUrlWithUser(
      data.url,
      req.user._id,
      data.slug
    );
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }

  res.status(200).json({
    shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}`,
  });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const url = await getShortUrl(id);

  if (!url) {
    throw new Error("Short URL not found");
  }

  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  const shortUrl = await createShortUrlWithoutUser(url, slug);

  res.status(200).json({
    shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}`,
  });
});

export const getHistory = wrapAsync(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  const urls = await getAllShortUrls(req.user._id);

  res.status(200).json(urls);
});

export const deleteShortUrlController = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteShortUrl(id);

  if (!deleted) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  res.status(200).json({
    message: "URL deleted successfully",
  });
});
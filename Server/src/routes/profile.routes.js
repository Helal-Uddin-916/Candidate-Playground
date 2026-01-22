const router = require('express').Router();
const controller = require('../controllers/profile.controller');
const auth = require('../middleware/basicAuth');
const { validateProfile } = require('../middleware/validateProfile');


router.post('/test', (req, res) => {
  res.json({ ok: true });
});

router.post('/', auth, validateProfile, controller.createProfile);
router.put('/', auth, validateProfile, controller.updateProfile);

router.get('/', controller.getProfile);
router.get('/projects', controller.getProjectsBySkill);
router.get('/search', controller.search);

module.exports = router;

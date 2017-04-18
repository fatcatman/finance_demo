package org.andy.work.service.impl;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.ImageDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Image;
import org.andy.work.entity.Organ;
import org.andy.work.service.ApprovalService;
import org.andy.work.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午3:24:16
 * 
 * @author andy
 * @version 2.2 UserService 的实现
 */
@Service("ImageService")
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageDao imageDao;

	@Override
	public Image load(int id) {
		return imageDao.load(id);
	}

	@Override
	public Image get(int id) {
		return imageDao.get(id);
	}

	@Override
	public List<Image> findAll() {
		return imageDao.findAll();
	}

	@Override
	public void persist(Image entity) {
        imageDao.persist(entity);
	}

	@Override
	public Integer save(Image entity) {
		return imageDao.save(entity);
	}

	@Override
	public void saveOrUpdate(Image entity) {
        imageDao.saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
        imageDao.delete(id);
	}

	@Override
	public void flush() {
        imageDao.flush();
	}

	@Override
	public List<Image> List(String type) {
		// TODO Auto-generated method stub
		return imageDao.List(type);
	}

	@Override
	public List<Image> ListPage(int page, int limit) {
		return imageDao.ListPage(page, limit);
	}

	@Override
	public List<Image> GetByName(String Name) {
		return imageDao.GetByName(Name);
	}

}

package org.andy.work.dao.impl;

import org.andy.work.dao.ImageDao;
import org.andy.work.entity.Image;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:45:14
 * 
 * @author andy
 * @version 2.2
 */
@Repository("imageDao")
public class ImageDaoImpl implements ImageDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Image load(int id) {
		return (Image) this.getCurrentSession().load(Image.class, id);
	}
	
	@Override
	public Image get(int id) {
		return (Image) this.getCurrentSession().get(Image.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Image> findAll() {
		List<Image> Approvals = this.getCurrentSession().createQuery("from Image").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Image> ListPage(int page,int limit) {
		List<Image> Approvals = this.getCurrentSession().createQuery("from Image").setFirstResult(page-1).setMaxResults(limit).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Image> List(String type) {
		Criteria crit = this.getCurrentSession().createCriteria(Image.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("type", type));
		List<Image> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Image> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(Image.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<Image> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@Override
	public void persist(Image entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Image entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Image entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Image entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}

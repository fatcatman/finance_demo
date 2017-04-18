package org.andy.work.dao.impl;

import org.andy.work.dao.GroupDao;
import org.andy.work.dao.ImageDao;
import org.andy.work.entity.Group;
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
@Repository("groupDao")
public class GroupDaoImpl implements GroupDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Group load(int id) {
		return (Group) this.getCurrentSession().load(Group.class, id);
	}
	
	@Override
	public Group get(int id) {
		return (Group) this.getCurrentSession().get(Group.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Group> findAll() {
		List<Group> Approvals = this.getCurrentSession().createQuery("from Group").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Group> List(int page,int limit) {
		List<Group> Approvals = this.getCurrentSession().createQuery("from Group").setFirstResult(page-1).setMaxResults(limit).list();
		return Approvals;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Group> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(Group.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<Group> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@Override
	public void persist(Group entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Group entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Group entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Group entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}

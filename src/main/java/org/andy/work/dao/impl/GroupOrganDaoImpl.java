package org.andy.work.dao.impl;

import org.andy.work.dao.GrouporganDao;
import org.andy.work.dao.OrganDao;
import org.andy.work.entity.Group;
import org.andy.work.entity.Grouporgan;
import org.andy.work.entity.Organ;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
@Repository("grouporganDao")
public class GroupOrganDaoImpl implements GrouporganDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Grouporgan load(int id) {
		return (Grouporgan) this.getCurrentSession().load(Grouporgan.class, id);
	}
	
	@Override
	public Grouporgan get(int id) {
		return (Grouporgan) this.getCurrentSession().get(Grouporgan.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Grouporgan> findAll() {
		List<Grouporgan> Approvals = this.getCurrentSession().createQuery("from Grouporgan").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Grouporgan getMapping(Organ org, Group group) {
		Criteria crit = this.getCurrentSession().createCriteria(Grouporgan.class);
		crit.add(Restrictions.eq("groupID", group));
		crit.add(Restrictions.eq("organ", org));
		Grouporgan list = (Grouporgan)crit.uniqueResult();

		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Grouporgan> getByOrg(Organ org) {
		Criteria crit = this.getCurrentSession().createCriteria(Grouporgan.class);
		crit.add(Restrictions.eq("organ", org));
		List<Grouporgan> list = crit.list();

		return list;
	}
	@Override
	public void persist(Grouporgan entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Grouporgan entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Grouporgan entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Grouporgan entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();

	}

}

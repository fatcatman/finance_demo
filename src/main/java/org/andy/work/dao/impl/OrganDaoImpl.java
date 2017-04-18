package org.andy.work.dao.impl;

import java.util.List;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.OrganDao;
import org.andy.work.entity.*;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 创建时间：2015-2-6 下午2:45:14
 * 
 * @author andy
 * @version 2.2
 */
@Repository("organDao")
public class OrganDaoImpl implements OrganDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Organ load(int id) {
		return (Organ) this.getCurrentSession().load(Organ.class, id);
	}
	
	@Override
	public Organ get(int id) {
		return (Organ) this.getCurrentSession().get(Organ.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> findAll() {
		List<Organ> Approvals = this.getCurrentSession().createQuery("from Organ").setCacheable(true).list();
		return Approvals;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> List(int page,int size) {
		List<Organ> list = this.getCurrentSession().createQuery("from Organ").setFirstResult(page-1).setMaxResults(size).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(Organ.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<Organ> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> ListbyGroup(int page,int limit,Group group) {
		String sql = "";
		if(group!=null)
		{
			sql= "SELECT * FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")";
			List<Organ> list = this.getCurrentSession().createSQLQuery(sql).addEntity(Organ.class).setFirstResult(page-1).setMaxResults(limit).list();
			return list;
		}
		return null;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> ListNotGroup(int page,int limit,Group group) {
		String sql = "";
		if(group!=null)
		{
			sql= "SELECT * FROM t_organ WHERE ID not in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")";
			List<Organ> list = this.getCurrentSession().createSQLQuery(sql).addEntity(Organ.class).setFirstResult(page-1).setMaxResults(limit).list();
			return list;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> ListAllbyGroup(Group group) {
		String sql = "";
		if(group!=null)
		{
			sql= "SELECT * FROM t_organ WHERE ID in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")";
			List<Organ> list = this.getCurrentSession().createSQLQuery(sql).addEntity(Organ.class).list();
			return list;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Organ> ListAllNotGroup(Group group) {
		String sql = "";
		if(group!=null)
		{
			sql= "SELECT * FROM t_organ WHERE ID not in (SELECT Organ FROM t_grouporgan WHERE GroupID="+group.getID()+")";
			List<Organ> list = this.getCurrentSession().createSQLQuery(sql).addEntity(Organ.class).list();
			return list;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Grouporgan getMapping(Organ org, Group group) {
		Criteria crit = this.getCurrentSession().createCriteria(Grouporgan.class);
		crit.add(Restrictions.eq("group", group));
		crit.add(Restrictions.eq("organ", org));
		List<Grouporgan> list = crit.list();
		if(list.size()==0)
		{
			return null;
		}
		return list.get(0);
	}

	@Override
	public void persist(Organ entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Organ entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Organ entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Organ entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();

	}

}

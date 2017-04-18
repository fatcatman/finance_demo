package org.andy.work.dao.impl;

import org.andy.work.dao.ParameterDao;
import org.andy.work.entity.Parameter;
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
@Repository("ParameterDao")
public class ParameterDaoImpl implements ParameterDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Parameter load(int id) {
		return (Parameter) this.getCurrentSession().load(Parameter.class, id);
	}
	
	@Override
	public Parameter get(int id) {
		return (Parameter) this.getCurrentSession().get(Parameter.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Parameter> findAll() {
		List<Parameter> Approvals = this.getCurrentSession().createQuery("from Parameter").setCacheable(true).list();
		return Approvals;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Parameter> list(int page,int limit) {
		List<Parameter> Approvals = this.getCurrentSession().createQuery("from Parameter").setFirstResult((page-1)*limit).setMaxResults(limit).list();
		return Approvals;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Parameter> getByName(String name) {
		Criteria crit = this.getCurrentSession().createCriteria(Parameter.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", name));
		List<Parameter> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Parameter order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Parameter> getByNameAndType(String name, String type) {
		Criteria crit = this.getCurrentSession().createCriteria(Parameter.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", name));
		crit.add(Restrictions.eq("type", type));
		List<Parameter> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Parameter order by ID desc").setEntity("Type",type).list();
		return list;
	}
	
	@Override
	public void persist(Parameter entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Parameter entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Parameter entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Parameter entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
